"""Generate self-contained Rafikis lockup SVGs (build tooling).

Letters are drawn with the official artwork: the wordmark outlines come from
the supplied lockup, and the descriptor is outlined from Work Sans. Nothing is
retyped in a substitute face. The output carries no font dependency, so it opens
identically in Figma, Illustrator, Canva, print, or a browser.

Run with:

    python scripts/make-lockup-svgs.py

Outputs land in public/brand/.
"""

from __future__ import annotations

import re
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "src" / "assets" / "fonts"
OUT_DIR = ROOT / "public" / "brand"
WORDMARK_SVG = ROOT / "src" / "assets" / "rafikis-wordmark.svg"

SANDSTONE = "#CEA984"
CHARCOAL = "#111111"
CLAY = "#9B3B0A"

# Lockup geometry in design units. The wordmark artwork is a 378 x 100 grid;
# every other measurement is derived from it so proportions never drift.
WORDMARK_W = 378.0
WORDMARK_H = 100.0
DESCRIPTOR_CAP = 21.0  # of the wordmark height, i.e. roughly a fifth
DESCRIPTOR_TRACKING = 0.42  # em
DESCRIPTOR_GAP = 30.0
# The wordmark artwork carries about 22 units of left side bearing inside its own
# width, so the descriptor run is inset by the same amount to keep the lockup
# optically balanced on both edges.
DESCRIPTOR_INSET = 22.0
SIDE_PADDING = 10.0


def wordmark_paths() -> list[str]:
    """The official Rafikis wordmark outlines, as ready-to-emit SVG path tags.

    Each letter carries its own x offset in the master artwork, so the
    transform attribute is preserved: dropping it stacks every letter on the
    first one.
    """
    svg = WORDMARK_SVG.read_text(encoding="utf-8")
    tags: list[str] = []
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


def work_sans(weight: int = 500) -> tuple[TTFont, float]:
    """Work Sans at `weight`, plus its true cap height in em.

    The cap height is measured from the "E" outline rather than read from the
    OS/2 table, because the variable font's published sCapHeight is 0.70em while
    the drawn capitals are 0.66em. Trusting the table makes the descriptor six
    percent too small.
    """
    font = TTFont(FONT_DIR / "WorkSans-Variable.woff2")
    font = instantiateVariableFont(font, {"wght": weight}, inplace=False, updateFontNames=False)
    glyph_set = font.getGlyphSet()
    pen = BoundsPen(glyph_set)
    glyph_set[font.getBestCmap()[ord("E")]].draw(pen)
    if not pen.bounds:
        raise SystemExit("Work Sans is missing an E outline")
    return font, pen.bounds[3] / font["head"].unitsPerEm


def layout_run(
    font: TTFont, text: str, size: float, tracking: float
) -> tuple[str, float, tuple[float, float]]:
    """Outline `text` as one run of paths at `size`, with `tracking` em of tracking.

    Returns the SVG fragment, the run width, and the ink bounds (y_min, y_max) in
    font units. The font is y-up while the wordmark artwork is y-down, so the
    caller flips this run and positions it by the resulting ink bounds.
    """
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    scale = size / upm

    parts: list[str] = []
    pen_x = 0.0
    ink_min = float("inf")
    ink_max = float("-inf")
    for char in text:
        glyph_name = cmap.get(ord(char))
        if glyph_name is None:
            raise SystemExit(f"Work Sans has no glyph for {char!r}")
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        commands = pen.getCommands()
        if commands:
            parts.append(f'<path transform="translate({pen_x:.3f} 0)" d="{commands}"/>')
        bounds_pen = BoundsPen(glyph_set)
        glyph.draw(bounds_pen)
        if bounds_pen.bounds:
            ink_min = min(ink_min, bounds_pen.bounds[1])
            ink_max = max(ink_max, bounds_pen.bounds[3])
        pen_x += glyph.width + tracking * upm
    if parts:
        pen_x -= tracking * upm  # no tracking after the final glyph
    if ink_min == float("inf"):
        raise SystemExit(f"no ink for {text!r}")
    return "\n        ".join(parts), pen_x * scale, (ink_min, ink_max)


def build_wordmark_group(color: str, indent: str) -> str:
    paths = "\n".join(f"{indent}  {tag}" for tag in wordmark_paths())
    return f'{indent}<g fill="{color}">\n{paths}\n{indent}</g>'


def build_descriptor_group(
    *, font: TTFont, cap_em: float, color: str, indent: str
) -> tuple[str, float]:
    """Outline "EAST AFRICAN GRILL" and place it under the wordmark.

    Returns the SVG fragment and the total height it needs, including the gap.
    """
    text = "EAST AFRICAN GRILL"
    size = DESCRIPTOR_CAP / cap_em
    outline_scale = size / font["head"].unitsPerEm
    target_width = WORDMARK_W - 2 * DESCRIPTOR_INSET

    body, run_width, _ = layout_run(font, text, size, DESCRIPTOR_TRACKING)
    # The tracked run is wider than the wordmark. The brand kit sets it to the
    # wordmark's optical width, so solve for the tracking, in em, that lands the
    # run exactly on the target width.
    plain_em = (run_width - DESCRIPTOR_TRACKING * size * (len(text) - 1)) / size
    tracking = (target_width / size - plain_em) / (len(text) - 1)
    body, run_width, (ink_bottom, _) = layout_run(font, text, size, tracking)

    # Work Sans is y-up and this artwork is y-down, so the run is flipped.
    # Unflipped the ink spans ink_bottom..0; flipped it spans 0..-ink_bottom, so
    # anchoring the baseline at ink_bottom lands the cap tops on the gap line.
    baseline = WORDMARK_H + DESCRIPTOR_GAP + ink_bottom * outline_scale
    offset_x = (WORDMARK_W - run_width) / 2.0
    paths = "\n".join(f"{indent}    {line}" for line in body.split("\n"))
    fragment = (
        f'{indent}<g fill="{color}" transform="translate({offset_x:.2f} {baseline:.2f}) '
        f'scale({outline_scale:.6f} -{outline_scale:.6f})">\n{paths}\n{indent}</g>'
    )
    return fragment, WORDMARK_H + DESCRIPTOR_GAP + DESCRIPTOR_CAP


def build_lockup(*, with_descriptor: bool, color: str, background: str | None) -> str:
    height = WORDMARK_H
    body: list[str] = []

    if with_descriptor:
        font, cap_em = work_sans(weight=500)
        descriptor, height = build_descriptor_group(
            font=font, cap_em=cap_em, color=color, indent="    "
        )
        body.append(descriptor)

    body.insert(0, build_wordmark_group(color, "    "))

    background_rect = (
        f'  <rect x="0" y="0" width="{WORDMARK_W:.0f}" height="{height:.0f}" fill="{background}"/>\n'
        if background
        else ""
    )
    label = "Rafikis" + (" — East African Grill" if with_descriptor else "")
    open_indent = '  <g transform="translate({:.1f} 0)">'.format(SIDE_PADDING)
    close_indent = "  </g>\n" if SIDE_PADDING else ""

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WORDMARK_W:.0f} {height:.0f}" '
        f'width="{WORDMARK_W:.0f}" height="{height:.0f}" role="img" aria-label="{label}">\n'
        + background_rect
        + (open_indent + "\n" if SIDE_PADDING else "")
        + "\n".join(body)
        + "\n"
        + close_indent
        + "</svg>\n"
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    files = {
        "lockup-primary.svg": build_lockup(with_descriptor=True, color=SANDSTONE, background=CHARCOAL),
        "lockup-primary-transparent.svg": build_lockup(
            with_descriptor=True, color=SANDSTONE, background=None
        ),
        "lockup-clay-orange.svg": build_lockup(with_descriptor=True, color=CLAY, background=CHARCOAL),
        "wordmark.svg": build_lockup(with_descriptor=False, color=SANDSTONE, background=None),
        "wordmark-charcoal.svg": build_lockup(
            with_descriptor=False, color=CHARCOAL, background=None
        ),
    }
    for name, content in files.items():
        path = OUT_DIR / name
        path.write_text(content, encoding="utf-8")
        print(f"  {path.relative_to(ROOT)}  {len(content)} bytes")


if __name__ == "__main__":
    main()
