"""Normalize working-copy line endings to LF to match the repository (build tooling).

The Windows checkout writes CRLF into the working copy because core.autocrlf is
true. Files edited here can end up with mixed endings, which makes Prettier
report a CRLF error on every line. This rewrites the named files as pure LF, and
leaves everything else alone.

Usage: python scripts/normalize-eol.py <file> [<file> ...]
"""

from __future__ import annotations

import sys
from pathlib import Path

CRLF = b"\r\n"
LF = b"\n"


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/normalize-eol.py <file> [<file> ...]")
    for name in sys.argv[1:]:
        path = Path(name)
        if not path.exists():
            print(f"  {name}: missing, skipped")
            continue
        data = path.read_bytes()
        crlf = data.count(CRLF)
        if crlf:
            path.write_bytes(data.replace(CRLF, LF))
            print(f"  {name}: {crlf} CRLF converted to LF")
        else:
            print(f"  {name}: already LF")


if __name__ == "__main__":
    main()
