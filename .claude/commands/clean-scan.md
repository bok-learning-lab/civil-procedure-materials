Extract text from a scanned PDF or image file using vision, then clean into structured Markdown.

Ask me which file to clean (e.g., `casebook/original/ch05-pleading.pdf`). If I give just a category and filename, look in `{category}/original/`.

Then:
1. Read each page/image using vision
2. Extract all text content, preserving:
   - Document structure (headings, sections, subsections)
   - Legal citations (*case names* in italics, § symbols, proper spacing)
   - Footnotes as markdown footnotes
   - Tables as markdown tables
   - Lists and enumerated items
3. Insert page anchors: `<!-- page: N -->`
4. **Flag uncertain readings** with inline comments: `<!-- uncertain: original may read "X" or "Y" -->`
5. Watch specifically for common OCR failure modes:
   - `l` / `1` swaps (especially in citations like `31` vs `3l`)
   - `O` / `0` swaps
   - Missing or garbled § symbols
   - Broken italics on case names
   - Footnote numbers merged into body text
   - Column text interleaving
6. Add YAML frontmatter:
   ```yaml
   ---
   title: "[extracted from document]"
   source: "[path to original file]"
   extracted_date: [today's date]
   extraction_method: vision
   ---
   ```
7. Save the cleaned markdown in the matching `cleaned/` folder (e.g., `casebook/original/ch05-pleading.pdf` → `casebook/cleaned/ch05-pleading.md`)
8. Report:
   - Total pages processed
   - Count of uncertain readings flagged
   - Any sections that definitely need human review
   - Suspicious legal citations

Do NOT modify the original file.
