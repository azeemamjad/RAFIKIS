"""Verify the social card copy matches the menu (build tooling).

Extracts every dish name and note from brand-templates/social.html and compares
them with scripts/probes/expected-menu.json, so a card cannot drift from the
menu it advertises.

Usage: python scripts/check-social-copy.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "brand-templates" / "social.html"
EXPECTED = ROOT / "scripts" / "probes" / "expected-menu.json"

CARD = re.compile(
    r'<h2 class="dish">(?P<name>.*?)</h2>.*?<p class="dish-note">(?P<note>.*?)</p>',
    re.DOTALL,
)


def main() -> None:
    html = HTML.read_text(encoding="utf-8")
    expected: dict[str, dict[str, str]] = json.loads(EXPECTED.read_text(encoding="utf-8"))
    # Flatten to name -> description, since a dish can only read one way.
    wanted = {name: note for dishes in expected.values() for name, note in dishes.items()}

    cards = [
        (m.group("name").strip(), " ".join(m.group("note").split())) for m in CARD.finditer(html)
    ]

    problems = []
    for name, note in cards:
        if name not in wanted:
            problems.append(f"{name!r} is not on the menu")
        elif wanted[name] != note:
            problems.append(f"{name}\n    menu: {wanted[name]}\n    card: {note}")

    print(f"found {len(cards)} dish cards in social.html")
    for name, _ in cards:
        print(f"  {name}")
    if problems:
        print("\nmismatches:")
        for problem in problems:
            print(f"  {problem}")
        raise SystemExit(1)
    print("\nevery card matches the menu copy exactly")


if __name__ == "__main__":
    main()
