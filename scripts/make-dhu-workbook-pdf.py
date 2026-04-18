#!/usr/bin/env python3
"""
Emit a minimal valid one-page PDF for the Dhu (ذُو) workbook (stdlib only).
Run from repo root: python3 scripts/make-dhu-workbook-pdf.py
"""
from __future__ import annotations

import pathlib


def build_pdf() -> bytes:
    lines = [
        "Dhu (zuu) — Possessor noun — Workbook",
        "",
        "Magnified nouns (al-Asma al-Khamsa) — practice: Dhu / Dhat",
        "",
        "1) Write the three singular mudaf forms of Dhu (raf / nasb / jarr):",
        "   Marfu: _______    Mansub: _______    Majrur: _______",
        "",
        "2) The noun after Dhu is always _______ (mudaf ilayhi).",
        "",
        "3) Label each:  Dhul-Arsh   Dha malin   Dhi ilmin  (which case?)",
        "",
        "4) Feminine singular: Dhatu / Dhata / Dhati — write one example.",
        "",
        "5) Masculine plural: nominative _______  ;  nasb/jarr _______",
        "",
        "6) One line: translate / gloss  ulu al-albab  (people of understanding).",
        "",
        "7) Optional: one ayah reference with Dhat (e.g. dhati lahab).",
        "",
        "Full charts: lesson  Magnified nouns  on this site.",
    ]
    # PDF string for each line: (x y) Td (text) Tj  — escape parentheses and backslash
    def esc(s: str) -> str:
        return s.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

    y = 720
    parts: list[bytes] = []
    for line in lines:
        if not line.strip():
            y -= 14
            continue
        parts.append(
            f"BT /F1 10 Tf 72 {y} Td ({esc(line)}) Tj ET\n".encode("latin-1", errors="replace")
        )
        y -= 14
    stream = b"".join(parts)

    # Build objects; compute offsets after
    obj_entries: list[bytes] = []
    # 1 Catalog
    obj_entries.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2 Pages
    obj_entries.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3 Page
    obj_entries.append(
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>"
    )
    # 4 Contents
    obj_entries.append(
        b"<< /Length "
        + str(len(stream)).encode("ascii")
        + b" >>\nstream\n"
        + stream
        + b"endstream"
    )
    # 5 Font
    obj_entries.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    out = bytearray()
    out += b"%PDF-1.4\n"
    offsets = [0]
    for i, body in enumerate(obj_entries, start=1):
        offsets.append(len(out))
        out += str(i).encode("ascii") + b" 0 obj\n"
        out += body + b"\nendobj\n"

    xref_pos = len(out)
    out += b"xref\n0 "
    out += str(len(obj_entries) + 1).encode("ascii") + b"\n"
    out += b"0000000000 65535 f \n"
    for i in range(1, len(obj_entries) + 1):
        off = offsets[i]
        out += f"{off:010d} 00000 n \n".encode("ascii")

    out += b"trailer\n<< /Size "
    out += str(len(obj_entries) + 1).encode("ascii")
    out += b" /Root 1 0 R >>\nstartxref\n"
    out += str(xref_pos).encode("ascii")
    out += b"\n%%EOF\n"
    return bytes(out)


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    dest = root / "assets" / "workbooks" / "dhu-workbook.pdf"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(build_pdf())
    print("Wrote", dest, "({} bytes)".format(dest.stat().st_size))


if __name__ == "__main__":
    main()
