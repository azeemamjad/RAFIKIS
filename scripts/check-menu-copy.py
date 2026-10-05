"""Check the rendered menu against expected-menu.json (build tooling).

Reads the live page with scripts/probe.mjs and compares every dish name and
description, character for character. Run the dev server first, then:

    node scripts/probe.mjs --url=http://127.0.0.1:5199/ \
        --file=scripts/probes/menu-content.js --width=1440 --height=900 > out.json
    python scripts/check-menu-copy.py out.json
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
EXPECTED = HERE / "probes" / "expected-menu.json"


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/check-menu-copy.py <probe-output.json>")
    raw = Path(sys.argv[1]).read_text(encoding="utf-8")
    data = json.loads(raw[raw.index("{") :])
    expected = json.loads(EXPECTED.read_text(encoding="utf-8"))

    problems: list[str] = []
    seen: set[str] = set()

    for section, dishes in expected.items():
        panel = data.get(section)
        if not isinstance(panel, dict):
            problems.append(f"{section}: not found in the rendered page")
            continue
        rendered = {d["name"]: d["description"] for d in panel["dishes"]}
        for name, description in dishes.items():
            seen.add(name)
            if name not in rendered:
                problems.append(f"{section}: {name!r} missing")
            elif rendered[name] != description:
                problems.append(
                    f"{section}: {name}\n    want: {description}\n    got : {rendered[name]}"
                )
        for name in rendered:
            if name not in dishes:
                problems.append(f"{section}: unexpected dish {name!r}")

    total = sum(len(v) for v in expected.values())
    print(f"checked {len(seen)} of {total} dishes against expected-menu.json")
    if problems:
        print()
        for problem in problems:
            print(f"  {problem}")
        raise SystemExit(1)
    print("every menu name and description matches exactly")


if __name__ == "__main__":
    main()
