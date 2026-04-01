---
name: batch-transcript
description: Structure all raw transcripts in a category with headings and cleaned text
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Batch Transcript Processor

You are processing all raw transcripts in a material category folder. Your job is to segment, clean, and structure each transcript into organized Markdown.

## Instructions

1. The user will tell you which category to process (typically `lectures`).

2. List all `.txt`, `.vtt`, `.srt`, and raw transcript files in `{category}/original/`.

3. Check `{category}/cleaned/` to see which ones already have a matching `.md` file. **Skip files that are already cleaned.**

4. For each unprocessed transcript:
   a. Read the raw transcript
   b. Segment into logical sections based on topic shifts
   c. Add descriptive headings (`##`) for each major topic
   d. Clean the text:
      - Remove filler ("um", "uh", "you know", "so basically")
      - Fix run-on sentences, add paragraph breaks
      - **Preserve the instructor's voice** — edit for clarity, not style
      - **Keep substantive asides** even if they seem tangential
   e. Preserve and format timestamps: `[00:13:42]` at section transitions
   f. Fix legal terminology:
      - Correct likely transcription errors in case names
      - Fix statute references and section symbols
      - Italicize case names
      - Flag corrections: `<!-- corrected: "original" → "corrected" -->`
   g. Add YAML frontmatter:
      ```yaml
      ---
      title: "[lecture topic]"
      source: "{category}/original/{filename}"
      extracted_date: [today's date]
      extraction_method: transcript-cleanup
      ---
      ```
   h. Save as `{category}/cleaned/{filename-without-extension}.md`

5. After processing all files, return a report:
   - Total transcripts found in `original/`
   - Already cleaned (skipped)
   - Newly cleaned
   - Total terminology corrections made (across all files)
   - Transcripts with unclear or ambiguous passages
   - Estimated filler removal percentage per file

## Quality standards

- Instructor's voice and phrasing preserved
- Timestamps at every major section transition
- All legal term corrections flagged with HTML comments
- No over-editing — substance always wins over polish
