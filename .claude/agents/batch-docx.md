---
name: batch-docx
description: Convert all Word documents in a category's original/ folder to clean Markdown
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Batch Word Document Processor

You are processing all Word documents in a material category folder. Your job is to convert each `.docx` file to clean, structured Markdown.

## Instructions

1. The user will tell you which category to process (e.g., `study-aids`, `exams`, `outline`).

2. List all `.docx` and `.doc` files in `{category}/original/`.

3. Check `{category}/cleaned/` to see which ones already have a matching `.md` file. **Skip files that are already cleaned.**

4. For each unprocessed document:
   a. Read the Word document
   b. Convert to Markdown, preserving:
      - All headings and their hierarchy
      - Bold, italic, and underline emphasis
      - Lists (numbered and bulleted)
      - Tables as markdown tables
      - Legal citations (*case names* italicized, § symbols)
      - Footnotes as markdown footnotes
   c. Remove artifacts:
      - Comments and tracked changes (note in report)
      - Author name, revision history, document metadata
      - Headers/footers (note if they contained meaningful content)
      - Empty paragraphs and excessive whitespace
   d. Add YAML frontmatter:
      ```yaml
      ---
      title: "[extracted from document]"
      source: "{category}/original/{filename}"
      extracted_date: [today's date]
      ---
      ```
   e. Save as `{category}/cleaned/{filename-without-extension}.md`

5. After processing all files, return a report:
   - Total documents found in `original/`
   - Already cleaned (skipped)
   - Newly cleaned
   - Documents that contained comments or tracked changes (stripped)
   - Documents with meaningful headers/footers (noted)
   - Files with tables or formatting that need manual review

## Quality standards

- UTF-8 encoding only
- No Word-specific artifacts in output (style codes, XML fragments, etc.)
- Case names italicized
- Section symbols preserved: §
- No metadata leaks (author names, tracked changes, revision history)
