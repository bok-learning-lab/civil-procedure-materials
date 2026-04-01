# Civil Procedure Course Materials

Machine-readable course materials for AI workflows. Original files go in; clean UTF-8 Markdown comes out.

## Repository Structure

```
civil-procedure-materials/
├── casebook/
│   ├── original/          ← Drop raw files here
│   └── cleaned/           ← Cleaned markdown output
├── lectures/
│   ├── original/
│   └── cleaned/
├── exams/
│   ├── original/
│   └── cleaned/
├── assignments/
│   ├── original/
│   └── cleaned/
├── study-aids/
│   ├── original/
│   └── cleaned/
├── outline/
│   ├── original/
│   └── cleaned/
├── restricted/            ← Student work, grades, feedback (FERPA-protected)
│   ├── original/
│   └── cleaned/
├── scripts/               ← Conversion and automation scripts
├── _context/              ← TA guides, reference material, dev docs
├── inventory.csv          ← Master tracking file
└── .claude/commands/      ← Claude skills for cleaning files
```

## For TAs

See [_context/ta-workflow.md](_context/ta-workflow.md) for the full guide.

### Quick start

1. Drop your original file in `{category}/original/` (e.g., `exams/original/2024-final.pdf`)
2. Run the matching Claude skill to clean it:
   - `/clean-pdf` — text-selectable PDFs
   - `/clean-scan` — scanned PDFs or images
   - `/clean-docx` — Word documents
   - `/clean-slides` — PowerPoint or PDF slide decks
   - `/clean-transcript` — raw transcripts
3. Cleaned output lands in `{category}/cleaned/`
4. Run `/qa-check` to verify the result
5. Update `inventory.csv`

### Naming

Lowercase, hyphens, no spaces: `2024-final.pdf`, `ch01-personal-jurisdiction.pdf`, `lecture-07.mp4`

### Privacy

**Do not upload student work, grades, or student-identifiable material to external AI tools.** FERPA applies. Student data goes in `restricted/` only.
