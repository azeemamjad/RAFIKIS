"""Build the Open Graph share card from the supplied wordmark artwork (build tooling).

WhatsApp, iMessage and the other link-preview crawlers want a landscape image,
at least 300px wide, ideally 1200x630 and comfortably under 300KB. The supplied
artwork is a 1080x1350 portrait square, so it is not used whole: the wordmark is
measured out of it and recomposed on a 1200x630 Charcoal field at the same 76%
of width the favicon uses, which keeps the two surfaces visually identical.

Run: python scripts/make-og.py <path-to-supplied-artwork.jpg>
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

WIDTH, HEIGHT = 1200, 630
WORDMARK_WIDTH_FRACTION = 0.76
# The wordmark's own 3.78 ratio, used only as a sanity check on the crop.
EXPECTED_RATIO = 3.78


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/make-og.py <artwork>")
    source = Path(sys.argv[1])
    if not source.exists():
        raise SystemExit(f"not found: {source}")

    im = Image.open(source).convert("RGB")
    background = im.getpixel((2, 2))

    # The artwork is the wordmark centred on flat Charcoal, so the ink box is
    # exactly the wordmark and nothing else.
    grey = im.convert("L")
    box = grey.point(lambda v: 255 if v > background[0] + 24 else 0).getbbox()
    if not box:
        raise SystemExit("no wordmark ink found in the supplied artwork")

    mark = im.crop(box)
    ratio = mark.width / mark.height
    print(f"source      : {source.name}  {im.size[0]}x{im.size[1]}")
    print(f"wordmark    : {mark.width}x{mark.height}  ratio {ratio:.2f} (expected {EXPECTED_RATIO})")

    target_w = round(WIDTH * WORDMARK_WIDTH_FRACTION)
    scale = target_w / mark.width
    mark = mark.resize((target_w, max(1, round(mark.height * scale))), Image.LANCZOS)

    card = Image.new("RGB", (WIDTH, HEIGHT), background)
    card.paste(mark, ((WIDTH - mark.width) // 2, (HEIGHT - mark.height) // 2))

    out = PUBLIC / "og.jpg"
    card.save(out, quality=90, optimize=True, progressive=True)
    size_kb = out.stat().st_size / 1024
    print(f"wrote       : public/og.jpg  {WIDTH}x{HEIGHT}  {size_kb:.1f} KB")
    print(f"              wordmark {mark.width}x{mark.height}, {mark.width / WIDTH:.0%} of width")
    print("note        : public/og.png is rendered from brand-templates/og.html by")
    print("              scripts/render-brand-assets.mjs and is not written here.")

    if size_kb > 300:
        raise SystemExit("og.jpg is over 300KB, which some crawlers will not fetch")


if __name__ == "__main__":
    main()
