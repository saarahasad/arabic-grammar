# PDF workbooks

Place your workbook files here so the site can open them in the browser (one page at a time).

| Workbook | Filename |
|----------|----------|
| Inna (إِنَّ) | `inna-workbook.pdf` |
| Laʿalla (لَعَلَّ) | `laalla-workbook.pdf` |
| Dhu / zuu (ذُو — possessor) | `dhu-workbook.pdf` |

**Viewer URL:** from the project root, open `workbook-pdf.html?id=inna`, `workbook-pdf.html?id=laalla`, or `workbook-pdf.html?id=dhu`.

The **Dhu** PDF is generated from the repo by running `python3 scripts/make-dhu-workbook-pdf.py` (stdlib only; overwrites `dhu-workbook.pdf`).

**Advanced:** `workbook-pdf.html?file=assets/workbooks/your-name.pdf` (path must stay under `assets/workbooks/` and end in `.pdf`).

Use a local HTTP server (not `file://`) so the PDF can load — for example: `python3 -m http.server 8080` from the `arabic-grammar` folder, then visit `http://localhost:8080/workbook-pdf.html?id=inna`.
