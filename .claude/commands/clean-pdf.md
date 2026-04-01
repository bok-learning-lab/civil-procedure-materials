Clean and extract text from a text-selectable PDF into structured Markdown.

Ask me which file to clean (e.g., `exams/original/2024-final.pdf`). If I give just a category and filename, look in `{category}/original/`.

Then:
1. Read the PDF file
2. Extract all text content, preserving:
   - Document structure (headings, sections, subsections)
   - Legal citations with proper formatting (*case names* in italics, correct § symbols, proper spacing)
   - Footnotes as markdown footnotes (`[^1]`)
   - Tables as markdown tables
   - Lists and enumerated items
3. Insert page anchors as HTML comments: `<!-- page: N -->` at each page break
4. Remove conversion artifacts:
   - Repeated headers/footers
   - Page numbers interspersed in body text
   - Stray formatting codes or HTML
   - Navigation chrome
5. Add YAML frontmatter:
   ```yaml
   ---
   title: "[extracted from document]"
   source: "[path to original file]"
   extracted_date: [today's date]
   ---
   ```
6. Save the cleaned markdown in the matching `cleaned/` folder (e.g., `exams/original/2024-final.pdf` → `exams/cleaned/2024-final.md`)
7. Report:
   - Total pages processed
   - Any sections that need manual review (garbled tables, unclear formatting)
   - Any legal citations that look suspicious

Do NOT modify the original file. If the PDF appears to be a scanned image (no selectable text), tell me to use `/clean-scan` instead.
