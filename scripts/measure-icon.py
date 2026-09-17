"""Diagnose an icon or lockup image before using it (build tooling).

Reports the artwork's ink box as a fraction of its frame and prints what that
means at real favicon sizes, which is how the supplied RAFIKIS icon was found to
be a 4:5 frame with the wordmark at only 6% of its height.

Usage: python scripts/measure-icon.py <image-path>
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

OUT_DIR = Path(__file__).resolve().parent.parent / "brand-templates"


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/measure-icon.py <image-path>")
    src = Path(sys.argv[1])
    if not src.exists():
        raise SystemExit(f"not found: {src}")

    im = Image.open(src).convert("RGB")
    width, height = im.size
    ratio = width / height
    print(f"source : {src.name}  {width}x{height}  ratio {ratio:.4f}")
    if abs(ratio - 1) > 0.01:
        print(f"         NOT SQUARE - an app icon must be 1:1, so this needs cropping")

    # Ink is anything meaningfully brighter than the charcoal ground.
    gray = im.convert("L")
    background = gray.getpixel((2, 2))
    box = gray.point(lambda v: 255 if v > background + 24 else 0).getbbox()
    if not box:
        raise SystemExit("no ink found")

    left, top, right, bottom = box
    ink_w, ink_h = right - left, bottom - top
    print(f"ink box: x {left}..{right}  y {top}..{bottom}  ({ink_w}x{ink_h})")
    print(f"         {ink_w / width:.2%} of frame width, {ink_h / height:.2%} of frame height")
    print(
        f"centre : x {((left + right) / 2 - width / 2) / width:+.2%}  "
        f"y {((top + bottom) / 2 - height / 2) / height:+.2%}"
    )

    preview = im.copy()
    ImageDraw.Draw(preview).rectangle([left, top, right, bottom], outline=(255, 0, 0), width=3)
    out = OUT_DIR / "_icon-measure.png"
    preview.save(out)
    print(f"preview: {out.relative_to(OUT_DIR.parent)}")

    print("\nat real icon sizes (a letter needs about 5 device px to resolve):")
    for size in (512, 180, 64, 32, 16):
        h = ink_h / height * size
        w = ink_w / width * size
        per_letter = w / 7  # RAFIKIS is seven glyphs wide including the space
        print(
            f"  {size:3d}px: ink {w:6.1f}x{h:5.1f}px  ~{per_letter:4.1f}px per letter  "
            f"{'ok' if h >= 5 and per_letter >= 5 else 'too small to read'}"
        )


if __name__ == "__main__":
    main()
