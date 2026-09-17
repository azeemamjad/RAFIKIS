"""Inline the generated favicon mark into brand-templates/icons.html (build tooling).

The raster app icons are screenshots of that page, so inlining public/favicon.svg
verbatim guarantees the PNG set and the SVG favicon can never drift apart.

Idempotent: any previously inlined mark is replaced, so this can be re-run after
every change to favicon.svg.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SVG = ROOT / "public" / "favicon.svg"
PAGE = ROOT / "brand-templates" / "icons.html"
PLACEHOLDER = "<!--ICON_SVG-->"

svg = SVG.read_text(encoding="utf-8").strip()
# It is inlined into an existing SVG-shaped page, so drop the outer tag's own
# width/height and let the container size it.
svg = re.sub(r'\s+width="[^"]*"', "", svg, count=1)
svg = re.sub(r'\s+height="[^"]*"', "", svg, count=1)
svg = svg.replace("<svg ", '<svg class="mark" ', 1)

html = PAGE.read_text(encoding="utf-8")

# Undo a previous run: put the placeholder back wherever a mark was inlined.
html, restored = re.subn(
    r'<svg class="mark".*?</svg>',
    PLACEHOLDER,
    html,
    flags=re.DOTALL,
)

if PLACEHOLDER not in html:
    raise SystemExit("icons.html has no <!--ICON_SVG--> placeholder")

html = html.replace(PLACEHOLDER, svg)
PAGE.write_text(html, encoding="utf-8")
print(
    f"inlined {len(svg)} bytes of favicon.svg into {PAGE.relative_to(ROOT)}"
    + (f" (replaced {restored} previous)" if restored else "")
)

