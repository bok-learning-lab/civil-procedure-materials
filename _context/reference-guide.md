# AI Materials Reference Guide

For the full, detailed version with tool setup, automation patterns, and worked examples, see the [HackMD reference](https://hackmd.io/RrSS0p3WSpeQ-c0CZ-Q6hw?view).

## Guiding Principles

- **Preserve originals.** Never overwrite a source file. Everything in `cleaned/` can be regenerated.
- **Extract before you transform.** If text is already machine-readable (Word, text-selectable PDF, HTML), use direct extraction. OCR and AI extraction are for when that fails.
- **Keep anchors clean.** Page numbers, slide numbers, timestamps — preserve them as structured markers (`<!-- page: 12 -->`, `[00:13:42]`), not as noisy headers/footers.
- **Human review stays in the loop.** Especially for legal citations, footnotes, tables, and diagrams.
- **Save work to the repo, not just to chat.** Prompts, scripts, and outputs belong in the repo.

## Quality Checks (After Every Conversion)

- [ ] **Encoding**: File is UTF-8 (no garbled characters)
- [ ] **Completeness**: Page/word count roughly matches original
- [ ] **Structure**: Headings, lists, emphasis preserved; renders correctly in preview
- [ ] **Legal citations**: Spot-check case names, statute numbers, § symbols
- [ ] **Anchors**: Page numbers / timestamps survived conversion
- [ ] **No artifacts**: No stray HTML, duplicated headers, conversion junk
- [ ] **No metadata leaks**: No author names, tracked changes, EXIF data from source

## Common Failure Modes

- Bad OCR on legal citations: `l` vs `1`, `O` vs `0`, missing §, broken italics
- Hidden junk in PDFs: duplicated headers, page numbers in body text
- Tables flattened into prose or split across pages
- Slides losing meaning when diagrams become text-only
- Transcript drift on names, acronyms, overlapping speech
- Over-cleaning that removes useful anchors

## Privacy (FERPA)

**Do not upload student work, grades, feedback, or any student-identifiable material to external AI tools** unless explicitly approved under the institution's data-handling policy. This is a federal compliance issue, not a preference.

- Student materials → `restricted/` folder only
- De-identify before any reuse beyond immediate course operations
- Check for metadata leaks in extracted text (author fields, revision history, EXIF)

## Tool Reference

| Tool | Install | Used For |
|---|---|---|
| `pandoc` | `brew install pandoc` | Word/HTML → Markdown (does NOT read PDFs) |
| `pymupdf` | `pip install pymupdf` | PDF text extraction |
| `pdfminer` | `pip install pdfminer.six` | PDF text extraction (alternative) |
| `ocrmypdf` | `pip install ocrmypdf` | OCR for scanned PDFs |
| `pytesseract` | `pip install pytesseract` + tesseract | OCR via Python |
| `python-pptx` | `pip install python-pptx` | PowerPoint text/notes extraction |
| Whisper | `pip install openai-whisper` | Audio/video transcription |
| `ffmpeg` | `brew install ffmpeg` | Media file splitting/conversion |
| `anthropic` | `pip install anthropic` | Claude API calls |
| `openpyxl` | `pip install openpyxl` | Excel processing |
