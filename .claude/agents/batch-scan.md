---
name: batch-scan
description: Vision-extract all scanned PDFs and images in a category's original/ folder
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Batch Scanned PDF / Image Processor

You are processing all scanned PDFs and image files in a material category folder using vision. Your job is to extract text and convert each to clean, structured Markdown.

## Instructions

1. The user will tell you which category to process (e.g., `casebook`, `exams`).

2. List all `.pdf`, `.png`, `.jpg`, `.jpeg`, `.tiff` files in `{category}/original/`.

3. Check `{category}/cleaned/` to see which ones already have a matching `.md` file. **Skip files that are already cleaned.**

4. For each unprocessed file:
   a. Read each page/image using vision
   b. Extract all text, preserving:
      - Document structure (headings, sections, subsections)
      - Legal citations (*case names* in italics, § symbols, proper spacing)
      - Footnotes as markdown footnotes
      - Tables as markdown tables
   c. Insert page anchors: `<!-- page: N -->`
   d. **Flag uncertain readings** inline: `<!-- uncertain: original may read "X" or "Y" -->`
   e. Watch for OCR failure modes:
      - `l` / `1` swaps
      - `O` / `0` swaps
      - Missing or garbled § symbols
      - Broken italics on case names
      - Footnote numbers merged into body text
      - Column text interleaving
   f. Add YAML frontmatter:
      ```yaml
      ---
      title: "[extracted from document]"
      source: "{category}/original/{filename}"
      extracted_date: [today's date]
      extraction_method: vision
      ---
      ```
   g. Save as `{category}/cleaned/{filename-without-extension}.md`

5. After processing all files, return a report:
   - Total files found in `original/`
   - Already cleaned (skipped)
   - Newly cleaned
   - Total uncertain readings flagged (across all files)
   - Files with sections that definitely need human review
   - Suspicious legal citations found

## Quality standards

- UTF-8 encoding only
- Flag every uncertain reading — do not silently guess
- Case names italicized
- Section symbols preserved: §
- Page anchors as `<!-- page: N -->`
