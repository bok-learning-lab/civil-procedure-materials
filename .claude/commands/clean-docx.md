Convert a Word document (.docx) to clean, structured Markdown.

Ask me which file to clean (e.g., `study-aids/original/jurisdiction-outline.docx`). If I give just a category and filename, look in `{category}/original/`.

Then:
1. Read the Word document
2. Convert to clean Markdown, preserving:
   - All headings and their hierarchy
   - Bold, italic, and underline emphasis
   - Lists (numbered and bulleted)
   - Tables as markdown tables
   - Legal citations with proper formatting (*case names* italicized, § symbols, spacing)
   - Footnotes as markdown footnotes
3. Remove artifacts:
   - Comments and tracked changes (note in report if any were found)
   - Author name, revision history, and other document metadata
   - Headers/footers (note their content in the report in case any are meaningful)
   - Empty paragraphs and excessive whitespace
   - Any embedded style/formatting codes
4. Add YAML frontmatter:
   ```yaml
   ---
   title: "[extracted from document]"
   source: "[path to original file]"
   extracted_date: [today's date]
   ---
   ```
5. Save the cleaned markdown in the matching `cleaned/` folder (e.g., `study-aids/original/jurisdiction-outline.docx` → `study-aids/cleaned/jurisdiction-outline.md`)
6. Report:
   - Whether comments or tracked changes were found (and stripped)
   - Whether headers/footers contained meaningful content
   - Any tables or formatting that may need manual review
   - Any metadata that was present in the document properties

Do NOT modify the original file.
