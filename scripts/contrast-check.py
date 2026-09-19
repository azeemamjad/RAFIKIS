"""Contrast checks for the menu tab treatments (build tooling).

Evaluates the candidate selected-tab treatments against the Charcoal ground so
the decision is made on numbers rather than taste.

Usage: python scripts/contrast-check.py
"""

from __future__ import annotations

CHARCOAL = "#111111"
SANDSTONE = "#CEA984"
CLAY = "#9B3B0A"


def rgb(hex_colour: str) -> tuple[float, float, float]:
    value = hex_colour.lstrip("#")
    return tuple(int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))  # type: ignore[return-value]


def luminance(hex_colour: str) -> float:
    def channel(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (channel(c) for c in rgb(hex_colour))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def blend(fg: str, bg: str, alpha: float) -> str:
    f, b = rgb(fg), rgb(bg)
    mixed = tuple(round((f[i] * alpha + b[i] * (1 - alpha)) * 255) for i in range(3))
    return "#%02X%02X%02X" % mixed


TAB_PX = 11  # the menu tab size, which is not "large text" under WCAG

rows = [
    ("A. current: Sandstone text on Charcoal", SANDSTONE, CHARCOAL),
    ("B. Clay chip: Charcoal text on Clay fill", CHARCOAL, CLAY),
    ("C. Clay text on Charcoal", CLAY, CHARCOAL),
    ("D. Sandstone 60% (inactive) on Charcoal", blend(SANDSTONE, CHARCOAL, 0.60), CHARCOAL),
    ("E. Sandstone 65% on Charcoal", blend(SANDSTONE, CHARCOAL, 0.65), CHARCOAL),
]

print(f"WCAG AA for text below 18.66px bold / 24px regular needs 4.5:1.")
print(f"Menu tabs are {TAB_PX}px, so they are normal-size text.\n")
print(f"{'treatment':46s} {'ratio':>7s}  verdict")
print("-" * 78)
for label, fg, bg in rows:
    value = ratio(fg, bg)
    if value >= 4.5:
        verdict = "PASS AA"
    elif value >= 3.0:
        verdict = "fails AA text, passes 3:1 for UI boundaries"
    else:
        verdict = "FAIL"
    print(f"{label:46s} {value:6.2f}:1  {verdict}")

print("\nThe Clay chip also needs its border to read against Charcoal (WCAG 1.4.11, 3:1):")
print(f"  Clay {CLAY} vs Charcoal {CHARCOAL}: {ratio(CLAY, CHARCOAL):.2f}:1")
print("\nHover on desktop keeps Clay text on Charcoal, which is why hover is not")
print("the same problem: it is a transient state on a pointer device, not the")
print("only way to see which tab is selected.")
