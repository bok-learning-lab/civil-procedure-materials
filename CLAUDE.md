# Civil Procedure Course Materials

Repository for converting course materials into clean, machine-readable text for AI workflows.

## Repository Structure

```text
casebook/           # Each has original/ and cleaned/ subfolders
lectures/
exams/
assignments/
study-aids/
outline/
restricted/         # Student work, grades, feedback — NEVER upload to external AI tools
_context/           # TA guides, reference material, dev docs
inventory.csv       # Master tracking file (one row per item)
.claude/commands/   # Claude skills for file cleaning
```

### Folder convention

Every material category has two subfolders:
- `original/` — raw source files, never modified
- `cleaned/` — extracted UTF-8 Markdown output

## Working in This Repo

### Materials Processing

- **Never modify files in `original/` folders** — these are the preserved sources
- Cleaned markdown goes in `cleaned/` as UTF-8 `.md` files
- Use YAML frontmatter: title, source path, extraction date
- Preserve page/slide/timestamp anchors as HTML comments: `<!-- page: 12 -->`
- Italicize case names, preserve legal citation formatting (§ symbols, proper spacing)
- One conceptual unit per file (one case, one lecture, one exam prompt, one model answer)
- Naming: lowercase, hyphens, no spaces, include year when relevant

### Privacy (FERPA)

- Never upload student work, grades, or student-identifiable data to external AI tools
- Student materials belong in `restricted/` only
- Check extracted text for metadata leaks (author names, tracked changes, EXIF data)

### Available Claude Skills

- `/clean-pdf` — Extract text from a text-selectable PDF
- `/clean-scan` — OCR and extract from a scanned PDF or image
- `/clean-docx` — Convert a Word document to markdown
- `/clean-slides` — Extract slides with diagram descriptions
- `/clean-transcript` — Structure a raw transcript with headings
- `/qa-check` — Run quality checks on a cleaned file
