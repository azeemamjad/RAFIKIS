"""Sanity check the generated lockup SVGs (build tooling).

Confirms the descriptor run sits inside the artboard and that the wordmark
group is positioned where the geometry expects it. Run after
scripts/make-lockup-svgs.py.
"""

from __future__ import annotations

import re
from pathlib import Path

BRAND_DIR = Path(__file__).resolve().parent.parent / "public" / "brand"

for path in sorted(BRAND_DIR.glob("*.svg")):
    svg = path.read_text(encoding="utf-8")
    view_box = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
    groups = re.findall(r'translate\((-?[\d.]+) (-?[\d.]+)\) scale\(1 -1\)', svg)
    width, height = (float(value) for value in view_box.groups())
    ok = True
    for x, y in groups:
        if float(x) < 0 or float(y) > height:
            ok = False
    print(f"{path.name:38s} viewBox {width:g}x{height:g}  groups={len(groups)}  {'ok' if ok else 'OUT OF BOUNDS'}")
