Clean and structure a raw transcript into organized Markdown with headings and sections.

Ask me which file to clean (e.g., `lectures/original/lecture-12-raw.txt`). If I give just a category and filename, look in `{category}/original/`.

Then:
1. Read the raw transcript
2. Segment the content into logical sections based on topic shifts
3. Add descriptive headings (`##`) for each major topic or section
4. Clean the text:
   - Remove filler words and phrases ("um", "uh", "you know", "so basically")
   - Fix run-on sentences and add paragraph breaks at natural points
   - **Preserve the instructor's voice and phrasing** — edit for clarity, not style
   - **Do not over-edit** — keep substantive asides even if they seem tangential
5. Preserve and format timestamps: `[00:13:42]` at section transitions
6. Fix legal terminology:
   - Correct likely transcription errors in case names (e.g., "Penoir" → *Pennoyer*)
   - Fix statute references and section symbols
   - Italicize case names
   - Flag any corrections with: `<!-- corrected: "original" → "corrected" -->`
7. Add YAML frontmatter:
   ```yaml
   ---
   title: "[lecture topic]"
   source: "[path to original transcript or recording]"
   extracted_date: [today's date]
   extraction_method: transcript-cleanup
   ---
   ```
8. Save the structured markdown in the matching `cleaned/` folder (e.g., `lectures/original/lecture-12-raw.txt` → `lectures/cleaned/lecture-12.md`)
9. Report:
   - Number of sections identified
   - Terminology corrections made
   - Spots where the transcript was unclear or ambiguous
   - Estimated percentage of filler removed

Do NOT modify the original file.
