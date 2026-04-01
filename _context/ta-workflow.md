# TA Workflow: Adding and Cleaning Materials

## The short version

1. Drop the original file in `{category}/original/`
2. Run a `/clean-*` Claude skill to extract and clean the text
3. Cleaned markdown appears in `{category}/cleaned/`
4. Run `/qa-check` to verify
5. Update `inventory.csv`

## Step-by-step

### 1. Save the original

Put the source file in the right category's `original/` folder. Use a clean filename — lowercase, hyphens, no spaces:

```
exams/original/2024-final.pdf
casebook/original/ch03-erie-doctrine.pdf
lectures/original/lecture-12-class-actions.mp4
study-aids/original/personal-jurisdiction-flowchart.docx
```

Never rename or modify a file after saving it in `original/`.

### 2. Clean it

Use the Claude skill that matches your source type:

| Source type | Claude skill | What it does |
|---|---|---|
| Text-selectable PDF | `/clean-pdf` | Extracts text, converts to structured markdown |
| Scanned PDF or image | `/clean-scan` | Vision extraction, flags uncertain spots |
| Word doc (.docx) | `/clean-docx` | Converts to markdown, strips artifacts |
| Slides (.pptx / PDF) | `/clean-slides` | Extracts text + describes diagrams |
| Transcript (raw text) | `/clean-transcript` | Segments into sections, adds headings |

Or do it manually — upload the file to Claude and ask for a markdown conversion.

### 3. Cleaned markdown format

Output files go in `{category}/cleaned/` with a `.md` extension matching the original filename:

```
exams/original/2024-final.pdf     →  exams/cleaned/2024-final.md
casebook/original/ch03-erie.pdf   →  casebook/cleaned/ch03-erie.md
```

Use this structure:

```markdown
---
title: "Document Title"
source: exams/original/2024-final.pdf
extracted_date: 2026-04-01
---

# Document Title

<!-- page: 1 -->

Content here...
```

Key formatting rules:
- **Page anchors**: `<!-- page: 12 -->` as HTML comments
- **Timestamps** (lectures): `[00:13:42]`
- **Case names**: italicized — *International Shoe Co. v. Washington*, 326 U.S. 310 (1945)
- **Footnotes**: markdown footnotes `[^1]`
- **Tables**: standard markdown tables

### 4. Verify with `/qa-check`

Run `/qa-check` and tell it which file to check. It will verify encoding, structure, citations, and flag anything that needs manual review.

### 5. Update inventory.csv

Add or update the row for your item.

## Naming conventions

- Lowercase, hyphens, no spaces: `2024-final.pdf` not `Final Exam 2024.pdf`
- Include year when relevant: `2024-midterm.pdf`, `ch01-personal-jurisdiction.pdf`
- No special characters

## Privacy

**Do not upload student work, grades, feedback, or student-identifiable material to external AI tools.** This is a FERPA requirement. Student materials go in `restricted/` only.

## Quick conversion reference

| Source | Simplest method | Output | Watch for |
|---|---|---|---|
| Word / HTML | Upload to Claude → Markdown | `.md` | Tracked changes, navigation chrome |
| PDF (text) | Upload to Claude or use pymupdf | `.md` | Multi-column interleaving, garbled tables |
| Scanned PDF | Upload to Claude vision | `.md` | `l`/`1` swaps, missing §, broken citations |
| Slides | Upload; ask for text + diagram descriptions | `.md` + images | Diagrams losing meaning as text-only |
| Video/audio | Upload to Claude or use Whisper | `.md` + timing | Case names, Latin phrases |
| Spreadsheets | Export CSV from Excel/Sheets | `.csv` / `.json` | Formulas, merged cells, hidden tabs |
