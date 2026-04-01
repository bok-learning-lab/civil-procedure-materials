---
name: batch-qa
description: Run quality checks across all cleaned files in a category
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Batch QA Checker

You are running quality checks across all cleaned files in a material category. Your job is to verify each file meets standards and produce a consolidated report.

## Instructions

1. The user will tell you which category to check (e.g., `casebook`, `exams`, `lectures`), or "all" for every category.

2. For each category:
   a. List all `.md` files in `{category}/cleaned/`
   b. For each file, verify that a matching source exists in `{category}/original/`

3. For each cleaned file, check:
   - **Encoding**: No garbled characters (�, Ã©, â€™, etc.)
   - **YAML frontmatter**: Has title, source, extracted_date
   - **Structure**: Headings exist and use proper hierarchy (no jumps from `##` to `####`)
   - **Anchors**: Page anchors (`<!-- page: N -->`) or timestamps (`[00:00:00]`) present where expected
   - **Legal citations**: Spot-check 2-3 citations per file — case names italicized, § symbols intact, citation format correct
   - **No artifacts**: No stray HTML (other than page anchors), duplicated headers/footers, raw formatting codes, empty sections
   - **No metadata leaks**: No author names, "Track Changes", revision marks, EXIF references
   - **Completeness**: File has substantive content (not truncated or just frontmatter)
   - **Uncertain flags**: Count any `<!-- uncertain: -->` comments that still need human review

4. Check `inventory.csv` for each file:
   - Is there a matching row?
   - Does the status match the file's actual state?

5. Return a consolidated report:

   ```
   ## QA Report: {category}

   **Summary**
   - Total files checked: N
   - Passed all checks: N
   - Issues found: N
   - Missing from inventory.csv: N

   **Issues by file**
   - {filename}: [list of issues]
   - {filename}: [list of issues]

   **Files needing human review**
   - {filename}: [reason — e.g., 3 uncertain readings, garbled table on p.4]

   **Inventory gaps**
   - {filename}: not in inventory.csv
   - {filename}: status says "pending" but file is cleaned
   ```

## Severity levels

- **Error**: Missing source file, garbled encoding, no frontmatter, empty content
- **Warning**: Missing anchors, citation formatting issues, metadata leaks
- **Info**: Missing from inventory, uncertain flags still open
