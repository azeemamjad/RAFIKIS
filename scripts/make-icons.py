"""Build the app icon set (build tooling).

The supplied icon artwork is a 4:5 frame with the wordmark at only 6% of its
height. Dropped in as-is it would be non-square and, at 32px, the wordmark would
render about 2px tall. This script:

  1. crops the supplied artwork to a square, preserving the wordmark's own
     proportions, and scales it up to 76% of the frame width;
  2. emits the "R" monogram, traced from the wordmark's own first letter, as the
     SVG favicon at 32px and below;
  3. writes a side-by-side sheet so the two can be compared at real sizes.

Raster icons are rendered from the SVGs by scripts/render-brand-assets.mjs.
Run: python scripts/make-icons.py [path-to-supplied-icon.png]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
TEMPLATES = ROOT / "brand-templates"
WORDMARK_SVG = ROOT / "src" / "assets" / "rafikis-wordmark.svg"

CHARCOAL = "#111111"
SANDSTONE = "#CEA984"
SQUARE = 1024
WORDMARK_WIDTH_FRACTION = 0.76


def wordmark_path_elements() -> list[str]:
    """The master wordmark's paths, with their per-letter x offsets preserved."""
    svg = WORDMARK_SVG.read_text(encoding="utf-8")
    tags = []
    for match in re.finditer(r"<path\b([^>]*?)/>", svg, re.DOTALL):
        attributes = match.group(1)
        d = re.search(r'\sd="([^"]+)"', attributes)
        if not d:
            continue
        transform = re.search(r'\stransform="([^"]+)"', attributes)
        rule = re.search(r'\sfill-rule="([^"]+)"', attributes)
        parts = []
        if transform:
            parts.append(f'transform="{transform.group(1)}"')
        if rule:
            parts.append(f'fill-rule="{rule.group(1)}"')
        parts.append(f'd="{d.group(1)}"')
        tags.append("<path " + " ".join(parts) + "/>")
    if not tags:
        raise SystemExit("wordmark outlines not found in rafikis-wordmark.svg")
    return tags


def write_svg(name: str, content: str) -> None:
    (PUBLIC / name).write_text(content, encoding="utf-8")
    print(f"  public/{name}  {len(content)} bytes")


def build_square_wordmark(source: Path, out_name: str) -> None:
    """Crop the supplied artwork to a square and scale the wordmark up."""
    im = Image.open(source).convert("RGB")
    width, height = im.size

    # Centre-crop to square without resampling: the artwork is symmetric, so
    # this keeps the wordmark on the exact centre of the square.
    side = min(width, height)
    im = im.crop(
        (
            (width - side) // 2,
            (height - side) // 2,
            (width - side) // 2 + side,
            (height - side) // 2 + side,
        )
    )

    # Ink box of the wordmark inside the square crop.
    gray = im.convert("L")
    background = gray.getpixel((2, 2))
    mask = gray.point(lambda v: 255 if v > background + 24 else 0)
    box = mask.getbbox()
    if not box:
        raise SystemExit("no wordmark ink found in the supplied artwork")
    left, top, right, bottom = box
    ink_w, ink_h = right - left, bottom - top

    # Scale so the ink spans the target fraction of the square, then paste back
    # centred. Both axes take the same factor, so the ratio is untouched.
    target_w = int(side * WORDMARK_WIDTH_FRACTION)
    factor = target_w / ink_w
    ink = im.crop(box).resize(
        (max(1, round(ink_w * factor)), max(1, round(ink_h * factor))),
        Image.LANCZOS,
    )

    canvas = Image.new("RGB", (SQUARE, SQUARE), tuple(im.getpixel((2, 2))))
    canvas.paste(ink, ((SQUARE - ink.width) // 2, (SQUARE - ink.height) // 2))
    canvas.save(PUBLIC / out_name, optimize=True)
    fraction = ink.width / SQUARE
    print(
        f"  public/{out_name}  {SQUARE}x{SQUARE}  wordmark {ink.width}x{ink.height}px "
        f"({fraction:.0%} of width, ratio {ink.width / ink.height:.3f})"
    )
    return fraction


def build_mark_svg() -> None:
    """The 'R' monogram, traced from the wordmark's first letter."""
    mark = re.search(r'\sd="([^"]+)"', wordmark_path_elements()[0]).group(1)
    pad = 15.0
    scale = (100.0 - 2 * pad) / 100.0
    write_svg(
        "favicon.svg",
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
        'width="100" height="100" role="img" aria-label="Rafikis">\n'
        f'  <rect width="100" height="100" fill="{CHARCOAL}"/>\n'
        f'  <g fill="{SANDSTONE}" transform="translate({pad:g} {pad:g}) scale({scale:.6f})">\n'
        f'    <path fill-rule="evenodd" d="{mark}"/>\n  </g>\n</svg>\n',
    )


def build_size_sheet(fraction: float) -> None:
    """Side-by-side sheet: mark vs wordmark at real favicon sizes."""
    cells = []
    for label, src, extra in (
        ("R mark", "../public/favicon.svg", ""),
        (
            "wordmark",
            "../public/icon-wordmark-1024.png",
            f"object-fit: contain; width: {fraction:.0%};",
        ),
    ):
        for size in (16, 32, 48, 64, 180):
            cells.append(
                f'<figure><div class="icon" style="width:{size}px;height:{size}px">'
                f'<img src="{src}" width="{size}" height="{size}" style="{extra}" />'
                f"</div><figcaption>{size}px<br />{label}</figcaption></figure>"
            )

    (TEMPLATES / "icon-sizes.html").write_text(
        "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n"
        "    <title>Rafikis — icon size comparison</title>\n    <style>\n"
        "      body { margin: 0; background: #0b0b0b; color: #cea984; padding: 32px;\n"
        "             font: 400 12px/1.5 system-ui, sans-serif; }\n"
        "      h1 { font: 600 13px/1.4 system-ui, sans-serif; letter-spacing: 0.18em;\n"
        "           text-transform: uppercase; margin: 0 0 6px; }\n"
        "      p.note { opacity: 0.55; margin: 0 0 28px; max-width: 62ch; }\n"
        "      .row { display: flex; align-items: flex-end; gap: 30px; }\n"
        "      figure { margin: 0; text-align: center; }\n"
        "      .icon { background: #111111; display: flex; align-items: center;\n"
        "              justify-content: center; }\n"
        "      .icon img { display: block; }\n"
        "      figcaption { margin-top: 10px; opacity: 0.6; font-size: 10px;\n"
        "                   letter-spacing: 0.06em; }\n"
        "    </style>\n  </head>\n  <body>\n"
        "    <h1>Favicon legibility</h1>\n"
        "    <p class=\"note\">Left: the R monogram. Right: the wordmark, cropped square and\n"
        "    scaled up to a uniform margin. Below 64px the wordmark's six letters fall under\n"
        "    two device pixels each and stop resolving.</p>\n"
        f'    <div class="row">\n      {"".join(cells)}\n    </div>\n'
        "  </body>\n</html>\n",
        encoding="utf-8",
    )
    print("  brand-templates/icon-sizes.html")


def main() -> None:
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    fraction = WORDMARK_WIDTH_FRACTION
    build_mark_svg()
    if source and source.exists():
        fraction = build_square_wordmark(source, "icon-wordmark-1024.png")
    else:
        print("  (no source artwork passed; skipped the square wordmark crop)")
    build_size_sheet(fraction)


if __name__ == "__main__":
    main()
