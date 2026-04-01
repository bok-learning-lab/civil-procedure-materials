Extract text and describe visual content from a slide deck (PowerPoint or PDF slides).

Ask me which file to clean (e.g., `lectures/original/lecture-07-slides.pptx`). If I give just a category and filename, look in `{category}/original/`.

Then:
1. Process each slide, extracting:
   - All text content (titles, bullets, body text)
   - Speaker notes (if present)
   - **Descriptions of diagrams, charts, flowcharts, and images** — describe what the visual communicates (relationships, flow, concepts), not just the labels
2. Structure each slide as:
   ```markdown
   ## Slide N: [Title]

   [bullet points and body text]

   [Diagram: description of what the visual shows and what legal concept it illustrates]

   **Speaker notes:** [notes content, if any]
   ```
3. Add YAML frontmatter:
   ```yaml
   ---
   title: "[deck title or lecture topic]"
   source: "[path to original file]"
   extracted_date: [today's date]
   total_slides: [count]
   ---
   ```
4. Save the cleaned markdown in the matching `cleaned/` folder (e.g., `lectures/original/lecture-07-slides.pptx` → `lectures/cleaned/lecture-07-slides.md`)
5. Report:
   - Total slides processed
   - Slides with diagrams/visuals that may need review
   - Slides with speaker notes vs. without
   - Any slides where the visual content carries more meaning than the text

Do NOT modify the original file.
