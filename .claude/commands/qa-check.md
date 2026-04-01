Run a quality check on a cleaned file.

Ask me which cleaned file to check (e.g., `exams/cleaned/2024-final.md`). If I give just a category and filename, look in `{category}/cleaned/`.

Then:
1. Verify the original exists:
   - Check `{category}/original/` for a matching source file

2. Read the cleaned markdown and check:
   - **Encoding**: No garbled characters (�, Ã©, â€™, etc.)
   - **YAML frontmatter**: Present with title, source, extracted_date
   - **Structure**: Headings exist and use proper hierarchy
   - **Page/timestamp anchors**: Present where expected
   - **Legal citations**: Spot-check for formatting — case names italicized, § symbols intact, citation format looks correct
   - **No artifacts**: No stray HTML tags (other than page anchors), duplicated headers/footers, raw formatting codes
   - **No metadata leaks**: No author names, "Track Changes", revision marks, or EXIF references
   - **Completeness**: File has substantive content (not truncated or empty sections)

3. Check if the item has a row in `inventory.csv`:
   - If not, note that it needs to be added

4. Report a summary:
   - What passed
   - What needs attention
   - Suggested next steps
