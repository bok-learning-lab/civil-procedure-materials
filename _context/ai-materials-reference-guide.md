# AI Materials Reference Guide

# Preparing Course Materials for AI Workflows

**TA Reference Guide**

*For the short version, see the [Quickstart](https://hackmd.io/ulSj5KECQi2Gh9aqpcSybA?view).*

---

## Before you dive in

This document is a reference, not a mandate. It covers a lot of ground because course materials come in a lot of formats, and the considerations vary. But the core task is not complicated: **take files in various formats and turn them into clean, organized text.** That's it.

Not everything described here needs to happen for every file, or right away, or at all. Some of these practices (like multi-pass OCR verification or per-item QA logs) are things that become relevant at scale or for tricky source material. Others (like keeping your originals separate from your processed files) are just good habits that prevent headaches. Read through once to get the lay of the land, then refer back to the sections that apply to whatever you're actually working on.

### Default workflow

For every item, the basic process is the same:

1. **Save the original file** in the category's `original/` folder (e.g., `exams/original/`). Never modify it.
2. **Identify the source type:** Word/HTML (direct text), text-based PDF, scanned PDF, slides, video/audio, or spreadsheet.
3. **Extract text** using the simplest reliable method — or run the matching Claude skill (`/clean-pdf`, `/clean-docx`, etc.).
4. **Save the cleaned output** as UTF-8 Markdown in the category's `cleaned/` folder (e.g., `exams/cleaned/`), or CSV/JSON for tabular data.
5. **Update `inventory.csv`** with the item's current status.

The rest of this document is context, detail, and guidance for when the basic process hits complications—which it will, because 19 years of accumulated course materials come in a lot of shapes.

---

## Contents

**[1. What We're Doing and Why](#1-what-were-doing-and-why)** — The goal, and why source quality matters for downstream AI tools.

**[2. A Few Guiding Principles](#2-a-few-guiding-principles)** — Preserve originals, extract before you transform, keep anchors, human review in the loop, save work to the repo.

**[3. File Structure and Organization](#3-file-structure-and-organization)**
- [Target format](#target-format) — Why Markdown, and what UTF-8 means.
- [Repository structure](#repository-structure) — Material-type folders at the top, item folders underneath.
- [The inventory](#the-inventory) — A course-level manifest for tracking what exists, what's been processed, and what's been reviewed.
- [Granularity: why smaller files matter](#granularity-why-smaller-files-matter) — How retrieval systems work with chunks, and why one conceptual unit per file helps.
- [Versioning and source of truth](#versioning-and-source-of-truth) — What happens when materials are updated.

**[4. Material Types and Conversion Approaches](#4-material-types-and-conversion-approaches)** — How to think about converting each kind of source, with chat-first and code-at-scale paths.
- [4a. Already-Digital Text](#4a-already-digital-text-word-docs-html-from-h2o-plain-text) — Word docs, HTML, plain text.
- [4b. PDFs (Text-Selectable)](#4b-pdfs-text-selectable) — PDFs where you can highlight and copy text.
- [4c. Scanned PDFs and Images](#4c-scanned-pdfs-and-images-ocr-required) — OCR, multi-pass verification, and where errors hide.
- [4d. Presentation Slides](#4d-presentation-slides-powerpoint-pdf-slides) — Text extraction plus diagram descriptions.
- [4e. Video and Audio](#4e-video-and-audio-transcription) — Transcription, domain vocabulary priming, and transcript cleanup as a separate step.
- [4f. Grading Spreadsheets](#4f-grading-spreadsheets-and-structured-data) — Exporting tabular data to CSV or JSON.

**[5. Metadata](#5-metadata)** — YAML metadata files and which fields matter.

**[6. Quality Checks and QA](#6-quality-checks-and-qa)** — What to verify after conversion, per-item QA logs, definition of done, and common failure modes.

**[7. Privacy, Access, and External Tools](#7-privacy-access-and-external-tools)** — FERPA rules for AI tools, de-identification, separating student data from course content.

**[8. Copyright and Licensing](#8-copyright-and-licensing)** — What you can store, transform, and share.

**[9. Automating Workflows: Prompt Chaining and Skills](#9-automating-workflows-prompt-chaining-and-skills)** — How to go from manual to automated once you have a working process.
- [What is a "skill"?](#what-is-a-skill) — Reusable prompt templates and associated code.
- [Example: A slide-description skill](#example-a-slide-description-skill) — A concrete worked example with code.
- [A general chaining pattern](#a-general-chaining-pattern) — The extraction → cleaning → verification → reconciliation pipeline.
- [Using chat tools effectively](#using-chat-tools-effectively) — Keep results in the repo, not just in chat.

**[10. Tool Setup](#10-tool-setup)** — Overview table of open-source tools and what each is used for.

**[11. Reference: Approaches by Material Type](#11-reference-approaches-by-material-type)** — A detailed table covering chat-based, code-based, and hybrid approaches for every material type, with tools and pitfalls.

---

## 1. What We're Doing and Why

The goal is to get every piece of course material—the casebook, study aids, model answers, lecture videos, slides—into a clean, machine-readable text format, organized in a shared repository. Once materials live in that form, they become usable inputs for retrieval-augmented generation (RAG) systems, fine-tuning pipelines, and custom chatbots that give students course-specific help.

The thing to understand about all of these downstream AI tools is that they are only as good as the source text they receive. A sloppy conversion now produces wrong answers later. This is the "garbage in, garbage out" principle, and it's the main reason this preparation work matters. But "getting it right" doesn't mean perfection on the first pass—it means having a setup where you can see what's been done, what's been checked, and what still needs attention.

---

## 2. A Few Guiding Principles

These aren't rules, but they're the ideas that recur across projects like this. They're worth keeping in the back of your mind:

- **Preserve originals.** Never overwrite a source file. Treat everything you produce—Markdown, transcripts, OCR output, descriptions—as a derived artifact that can be regenerated from the original.
- **Extract before you transform.** If a document already has machine-readable text (most Word docs, many PDFs, HTML), use that text directly. OCR and AI-assisted extraction are for when direct extraction isn't available or doesn't work.
- **Keep anchors — but keep them clean.** Page numbers, slide numbers, timestamps, and section headings let downstream systems cite back to specific locations in the original material. They're easy to strip out during cleanup and hard to reconstruct later. But preserve them in a structured way (e.g., `[p. 12]`, `## Slide 7`, `[00:13:42]`, or as HTML comments like `<!-- page: 12 -->`) rather than leaving noisy repeated headers and footers in the body text, which pollute retrieval.
- **Human review stays in the loop.** Especially for legal citations, footnotes, tables, diagrams, student work, and grading materials. Automated extraction gets you 90% of the way; the last 10% is where the errors that matter hide.
- **Save your work to the repo, not just to chat.** When you use Claude or another chat interface to help with extraction or cleanup, the prompts, scripts, and outputs should end up as files in the repository. A chat transcript is ephemeral; files in the repo are the record of what actually happened.

---

## 3. File Structure and Organization

### Target format

The standard target format for this kind of work is UTF-8 Markdown (.md) files. Markdown is plain text with lightweight formatting (headings, bold, lists, links). It's a standard, portable target format that virtually every AI tool and framework can ingest natively without additional parsing.

### Repository structure

Each material-type folder has two subfolders: `original/` (raw source files, never modified) and `cleaned/` (extracted UTF-8 Markdown). This is simple and flat — all exams live together, all casebook chapters live together.

```
civil-procedure-materials/
├── casebook/
│   ├── original/          ← Drop raw files here
│   └── cleaned/           ← Cleaned markdown output
├── lectures/
│   ├── original/
│   └── cleaned/
├── exams/
│   ├── original/
│   └── cleaned/
├── assignments/
│   ├── original/
│   └── cleaned/
├── study-aids/
│   ├── original/
│   └── cleaned/
├── outline/
│   ├── original/
│   └── cleaned/
├── restricted/            ← Student work, grades, feedback (FERPA-protected)
│   ├── original/
│   └── cleaned/
├── _context/              ← Guides and reference material
├── inventory.csv          ← Master tracking file
├── .claude/commands/      ← Claude skills (interactive, one file at a time)
├── .claude/agents/        ← Claude agents (batch processing)
└── README.md
```

This structure works well because multiple TAs can work in parallel across different categories, sensitive items are isolated in `restricted/`, and the original-to-cleaned relationship is clear from the folder layout.

Claude skills (`/clean-pdf`, `/clean-docx`, etc.) automate the conversion interactively. Claude agents (`batch-pdf`, `batch-docx`, etc.) handle bulk processing once you've tested the process on a few files. See `_context/skills-vs-agents.md` for the difference.

If the repo will hold large media files (video, high-res scans), consider using Git LFS or keeping media in parallel storage and versioning only pointers/manifests.

### The inventory

A course-level inventory file (`inventory.csv`) with one row per item is how you coordinate work across a team. It's the single place where you can see what exists, what's been processed, what's been reviewed, and what's still outstanding. Fields might include item ID, title, type, year, source format, processing status, reviewer, and notes.

### Granularity: why smaller files matter

Something worth understanding about how RAG systems work: they don't feed an entire corpus to a model at once. Instead, they break the corpus into chunks and retrieve only the chunks most relevant to a given query. This means the *unit of content* matters for how well retrieval performs.

A single 200-page file containing an entire semester of material is much harder for a retrieval system to work with than that same content split into individual cases, individual lecture summaries, individual model answers, and so on. When the content is granular, the retrieval system can pull back just the *International Shoe* analysis when a student asks about minimum contacts, rather than returning a massive document that happens to contain it somewhere on page 74.

This doesn't mean every paragraph needs its own file—the right level of granularity depends on the material. But as a general pattern, one conceptual unit per file (one case, one lecture, one assignment prompt, one model answer) tends to work well for retrieval.

> **On naming:** Lowercase filenames with hyphens instead of spaces or underscores, with the year included when material is year-specific (e.g., `2024-final` rather than `Final Exam 2024`). Special characters in filenames cause issues across operating systems and in URLs. A good filename is its own documentation.

### Versioning and source of truth

With 19 years of materials that are still being updated, it's worth being intentional about what happens when something changes:

- **Which version is canonical?** If the instructor updates a study aid mid-semester, does the repo keep both versions or replace the old one? The recommended default is to keep both and mark the older one as superseded in its metadata (`status: superseded`, `superseded_by: study-aid-v2`). This way the old version is still available if needed but clearly labeled.
- **Re-extraction.** If a conversion needs to be re-done (better tool, corrected OCR, updated formatting), the original is always available in `original/`. Replace the files in `cleaned/`, update the `qa.md` to note what changed, and update the inventory.
- **Don't version extracted text separately.** The repo's own version control (Git) handles this. If you need to see what the extracted text looked like before a re-extraction, Git history has it.

---

## 4. Material Types and Conversion Approaches

Each material type has its own conversion path. The sections below walk through these from simplest to most involved. For any given file, the right approach depends on what form the source material is actually in—which may not be obvious until you open it.

Two things to keep in mind throughout:

- **Check whether the document already has machine-readable text before doing anything else.** If you can select and copy text in a PDF, or if the source is a Word doc or HTML file, the text is already there. Direct extraction is simpler and more reliable than OCR or AI-assisted extraction. Those heavier approaches are for when direct extraction isn't available or produces garbage.
- **There are two speeds for this work.** You can process files one at a time in a chat interface (upload a file, ask for a conversion, review the result), or you can write scripts that loop through many files and apply the same conversion programmatically. The one-at-a-time approach is the right way to start—it's how you learn what the materials actually need. Code comes in when you have a process that works and want to apply it across dozens or hundreds of files.

### 4a. Already-Digital Text (Word docs, HTML from H2O, plain text)

This is the straightforward case. The text already exists as selectable characters; the task is just converting the format.

#### One at a time (chat interface)

Upload the file to Claude (or paste the text) and ask something like: "Convert this to clean Markdown. Preserve all headings, lists, and emphasis. Remove any navigation artifacts or page chrome." For most Word docs and HTML files, this produces a clean result that you can review and save.

For H2O specifically: if there's an official export option (e.g., export to Word), that's a better starting point than scraping the HTML, since it's more likely to preserve the intended structure.

#### At scale (code)

The most common tool for batch conversion of Word documents and HTML is **pandoc**, a universal converter that handles these formats well from the command line. You give it an input file and a target format, and it produces the output. Once you have a pandoc command that works for one file, you can wrap it in a script that loops through a folder of files and converts them all.

> **Important note on pandoc and PDFs:** Pandoc is excellent for Word, HTML, and other markup formats, but it does **not** read PDFs as an input format. For PDFs, you need a dedicated PDF extraction tool first (see 4b and 4c below), then optionally pandoc for further format normalization.

Other approaches include using Python libraries for specific formats, or piping files through the Anthropic API to do the conversion via an LLM call—which gives you more control over how the output is structured, but is slower and costs per-call.

#### Things to watch for

Automated converters tend to preserve *everything*, including junk: HTML comment tags, empty divs, style attributes, navigation elements. The output needs a scan after conversion to strip anything that isn't actual content. H2O exports in particular tend to contain annotation layers and JavaScript artifacts that come through as noise.

With Word documents specifically, watch for comments, tracked changes, headers/footers, and two-column layouts—these can all produce surprising results. Saving both a cleaned Markdown file and a raw text dump can be helpful for debugging when something looks off.

---

### 4b. PDFs (Text-Selectable)

A quick way to tell which kind of PDF you have: try to highlight and copy text. If that works, it's text-based, and these generally convert well.

#### One at a time

Upload the PDF to Claude and ask it to extract the text and convert to Markdown. For simple layouts, this works well. For complex layouts (multi-column, heavy footnotes, tables), you may need to go page by page or section by section and review more carefully.

#### At scale

Several Python PDF libraries handle text-based PDF extraction well—pymupdf, pdfminer, and pypdf are the most common. (Note: pandoc does not read PDFs as input, so this is where dedicated PDF tools are needed.) Different tools make different mistakes—one might handle footnotes better while another handles multi-column layouts better. For important documents, extracting with two different tools and diffing the results is a way to catch errors that either tool alone would miss.

#### Things to watch for

Multi-column layouts, footnotes, and sidebars are where text-based PDF extraction gets unreliable. The tool may interleave columns, merge footnote text into the body, or lose the reading order. Tables often come out garbled. These are the files where a manual review pass matters most.

---

### 4c. Scanned PDFs and Images (OCR Required)

If text can't be selected in the PDF, it's a scanned image. This requires Optical Character Recognition (OCR) to extract text, and the results are inherently less reliable than text-based extraction.

Some PDFs are mixed—some pages have embedded text and others are scanned. The tool `ocrmypdf` can detect which pages need OCR and skip the ones that already have text (`ocrmypdf --mode skip input.pdf output.pdf`), which avoids the common mistake of re-OCR-ing pages that were fine to begin with.

#### One at a time

Upload the scanned page (or PDF) to Claude and ask it to extract the text. Claude's vision capability can read scanned documents directly. For a single document, this is often the easiest path. Ask it to note anything it's uncertain about—this flags the spots where you need to check the original.

#### At scale

For batch OCR, the standard open-source tool is **Tesseract** (often accessed through Python wrappers or through the `ocrmypdf` command-line tool). These produce a baseline extraction that's fast and reproducible.

A common pattern for getting reliable text out of scanned documents at scale is to run two independent extractions—one with a traditional OCR tool, one with a vision model (like Claude)—and then diff the results. Where they agree, confidence is high. Where they disagree, those are QA flags for human review. This sounds heavy, but it's automatable and catches the errors that any single tool misses.

Not every scanned PDF warrants the full multi-pass treatment. For a clean, high-resolution scan of a text-heavy document, a single pass plus a spot-check may be plenty. The multi-pass approach is most valuable for older, lower-quality scans and for documents where legal citations and formatting really matter.

> ⚠️ **OCR failure modes to know about:** Footnote numbers merging with body text. Column text interleaving. Headers/footers repeating inside the body text. Legal symbols (§, ¶, †, ‡) replaced with garbage characters. Italicized case names losing their emphasis. `l` becoming `1`, `O` becoming `0`. These are all common, and they're all easy to miss if you don't look for them.

---

### 4d. Presentation Slides (PowerPoint, PDF slides)

Slides are a distinct challenge because they combine sparse text with meaningful visual layout, diagrams, and images. Extracting just the text often isn't enough—a diagram that explains a doctrinal point has information in its spatial structure, not just its labels.

#### One at a time

Upload the slide deck (or individual slide images) to Claude and ask it to extract the text and describe any diagrams or visual content. This is one of the cases where an LLM is doing something that a deterministic tool can't easily do: interpreting the *meaning* of a visual layout, not just reading the words on it.

For each slide, you want both the literal text and a description of any diagrams, charts, or flowcharts—what the visual is communicating, not just what labels are on it. Speaker notes, if present, should also be captured.

#### At scale

Python's `python-pptx` library extracts text and speaker notes from PowerPoint files programmatically. (One caveat: check `slide.has_notes_slide` before accessing notes, since accessing `slide.notes_slide` on a slide without notes will create an empty one.) The text extraction part is straightforward; the diagram description part still requires a vision model. A typical batch workflow extracts the text with a library, exports each slide as an image, sends the images to a vision model for descriptions, and combines the results into one Markdown file per slide or per deck.

Keep slide number anchors in the output—they're the reference point for connecting slide content back to the original deck and to lecture recordings.

> 💡 **A useful structure for slide markdown:** `## Slide N: [Title]` / `[bullet text]` / `[diagram description: ...]` / `**Speaker notes:** ...` — this pattern is easy for models to parse later, and it keeps the visual description clearly separated from the actual text content.

---

### 4e. Video and Audio (Transcription)

The lecture summary videos (~10 min each) and any TA video projects need to be transcribed. Transcription technology has gotten very good, but it has specific blind spots worth understanding—especially with domain-specific vocabulary.

#### One at a time

Upload the video or audio file directly to Claude and ask it to transcribe. For the ~10-minute lecture summaries, this is practical. For longer files, you may need to split them into chunks first (ffmpeg is a common command-line tool for this).

#### At scale

The most widely used open-source transcription model is **Whisper** (by OpenAI), which runs locally and handles most audio/video well. It has an `--initial_prompt` flag that lets you feed it domain vocabulary at the start of transcription—for Civil Procedure, priming it with terms like "personal jurisdiction," "Erie doctrine," "12(b)(6)" can improve accuracy on legal terminology. Two caveats worth knowing: the prompt is limited to 224 tokens (roughly a short paragraph), and OpenAI's own documentation describes the technique as helpful but "not especially reliable" — so it's a useful aid, not a guarantee.

It's worth keeping both a human-readable transcript (`.md` or `.txt`) and a machine-friendly timing file (`.json`, `.vtt`, or `.srt`) if the transcription tool produces one. Timestamps allow downstream systems to link answers back to specific moments in a lecture recording.

#### Transcript cleanup: a separate step

Something to be aware of is that a raw transcript and a usable lecture document are quite different things. A raw transcript is a wall of text with no structure—no headings, no paragraph breaks at topic transitions, and plenty of filler language. Spoken language is just structurally different from written language.

Many projects treat transcript cleanup as its own distinct phase, separate from the initial transcription. This typically involves removing filler phrases, segmenting the lecture into topics, adding headings, and light editing for readability without changing the meaning.

This can be done manually, but it's also a task where an LLM does well. Feeding a raw transcript to Claude with a prompt like "Segment this lecture transcript into sections with descriptive headings. Remove filler language but preserve all substantive content and the instructor's phrasing" tends to produce a good first draft that a human can then review.

> ⚠️ **Transcription failure modes:** Legal terms are the main danger zone. Transcription models will get case names wrong (*Pennoyer v. Neff* might become "Penoir v. Neff"), mishandle statute numbers, and stumble on Latin phrases. A terminology review pass afterward is part of the process. A practical technique is to build a correction list of known terms and run find-and-replace across all transcripts.

---

### 4f. Grading Spreadsheets and Structured Data

For exam grading spreadsheets, rubrics, and any tabular data, the target formats are CSV or JSON—both of which models can read natively without any special handling.

Spreadsheets can be converted programmatically with Python libraries, or you can export to CSV directly from Excel or Google Sheets. The main thing to watch for is that formulas, merged cells, and multi-sheet workbooks can produce confusing output—flatten these into plain data rows before exporting.

---

## 5. Metadata

Metadata lives in two places in this repo:

**YAML frontmatter** at the top of each cleaned `.md` file:

```yaml
---
title: "Civil Procedure Final Exam"
source: exams/original/2024-final.pdf
extracted_date: 2026-04-01
---
```

This is the minimum. The skills add this automatically when they process a file.

**`inventory.csv`** at the repo root tracks the status of every item across the project — what exists, what's been cleaned, what's been reviewed, and what's outstanding. Fields include item ID, title, type, year, source format, processing status, reviewer, and notes. This is how the team coordinates so work doesn't get duplicated.

---

## 6. Quality Checks and QA

After conversion, there are a set of checks that catch the most common problems. These are the things that, if missed, tend to surface later as confusing model behavior or wrong answers:

- **Encoding.** The file is UTF-8. If you open it in a text editor and see &#xFFFD; or garbled characters, the encoding was wrong during conversion.
- **Completeness.** Compare the page/word count against the original. Missing sections mean the conversion silently dropped content—this happens more often than you'd expect, particularly with PDFs that have unusual layouts.
- **Structure.** Headings, lists, and emphasis are preserved. The Markdown renders correctly when previewed (any Markdown viewer or VS Code's built-in preview works for this).
- **Legal citations.** Spot-check a few case names, statute numbers, and section symbols (§). These are the most frequent OCR and transcription casualties, and they're the kind of error that makes a chatbot give confidently wrong answers. A citation like *International Shoe Co. v. Washington, 326 U.S. 310 (1945)* that loses its italics, periods, or spacing becomes harder for a model to interpret correctly.
- **Anchors.** Page numbers, slide numbers, and timestamps survived the conversion and are preserved in a structured way (inline markers or comments, not repeated header/footer junk).
- **No artifacts.** No stray HTML tags, page numbers interspersed in body text, duplicated headers/footers, or other conversion artifacts.
- **No metadata leaks.** Source files—especially Word documents—can contain author names, revision history, comments, and tracked changes that shouldn't be exposed. Image files can carry EXIF data with location or device information. Check that the extracted text doesn't include information that wasn't meant to be part of the public-facing material.

### QA with Claude

Run `/qa-check` on any cleaned file to verify encoding, structure, citations, and completeness. For batch QA across a whole category, use the `batch-qa` agent.

### Definition of done

An item is complete when:

- [ ] Original file preserved in `{category}/original/`
- [ ] Cleaned markdown saved in `{category}/cleaned/`
- [ ] Filename follows naming conventions (lowercase, hyphens, no spaces)
- [ ] YAML frontmatter present (title, source, extracted_date)
- [ ] `/qa-check` passes (or issues are noted in `inventory.csv`)
- [ ] `inventory.csv` updated with current status

### Common failure modes

Across many projects, certain problems appear frequently enough to be worth listing:

- **Bad OCR on legal citations** — `l` vs `1`, `O` vs `0`, missing section symbols, broken italics
- **Hidden junk in PDFs** — duplicated headers, page numbers in body text, broken reading order
- **Tables flattened into prose** or split across pages
- **Slides that lose meaning** because the real content is in charts, screenshots, SmartArt, or handwritten annotations, not in the bullet text
- **Transcript drift** on names, acronyms, or overlapping speech
- **Metadata leaks** from comments, author fields, embedded revision history, or image EXIF data
- **Over-cleaning** that removes useful anchors (page numbers, timestamps, section markers) needed later for citation, QA, or RAG retrieval

---

## 7. Privacy, Access, and External Tools

This is worth its own section because the course materials include student submissions, grading sheets, annotation files, and feedback—material that falls under FERPA and institutional data-handling expectations.

### The most important rule

**Do not upload student work, grades, feedback, or any student-identifiable material to external AI services** (Claude, ChatGPT, Gemini, or any other consumer AI tool) **unless that specific use has been explicitly approved under the institution's data-handling policy.**

This is not a suggestion—it's a FERPA compliance issue. Under current federal regulations, sharing student records with a third-party service requires a formal institutional agreement under the "school official" exception (34 CFR § 99.31(a)(1)). An individual TA signing up for a free AI tool and uploading student work does not meet that standard. As of early 2026, the U.S. Department of Education has not issued AI-specific FERPA guidance, so institutions are applying existing regulations through interpretation. Check with your institution's registrar or data privacy office if you're unsure what's approved.

### Other considerations

- **Student work, grading data, and individualized feedback** should be kept in a restricted area of the repository (`restricted/`), separate from general course content.
- **De-identification** is the default for any reuse beyond immediate course operations. If student work is going to be used as training examples or test inputs, names and identifying information need to be removed first. Note that FERPA's "reasonable person standard" means stripping names alone may be insufficient if other contextual information could re-identify students.
- **Demonstration and test corpora** (used for developing and testing AI tools) should be clearly separated from real student data, so there's no ambiguity about what's what.
- **Access logging** — knowing who can see the sensitive folders and why — is good practice even if it's just a note in the README.

This doesn't need to be elaborate, but it needs to be intentional. The easiest time to get the separation right is at the beginning, when the folder structure is being set up.

---

## 8. Copyright and Licensing

This is a separate concern from privacy. The course materials include casebook content, third-party readings, study aids, and possibly vendor-exported material (from H2O, for example). Before ingesting, transforming, storing, or sharing these materials, it's worth considering:

- **Source ownership and license status.** Who owns the content? Instructor-created materials (exams, model answers, lecture recordings, study aids) are typically the clearest case. Third-party casebook excerpts, published articles, and vendor-platform exports may have restrictions.
- **Whether vendor exports may be stored in the repo.** If material was exported from a platform like H2O, check whether the platform's terms of use permit storing and redistributing the exported content in a new format.
- **Scope of use.** There's a meaningful difference between using materials for *internal retrieval* (a chatbot that surfaces the right passage to a student), *derivative works* (AI-generated practice questions based on exam patterns), and *training data* (fine-tuning a model on the corpus). The copyright implications differ for each.
- **Whether materials can be shared beyond course staff.** If the repository might eventually be accessible to students, collaborators, or other institutions, materials with restricted licenses need to be identified and handled appropriately.

This section is intentionally general because the specifics depend on the institution and the materials. The point is to flag the questions early—before 200 items have been ingested—and to record the answers (or open questions) in the repository's README or in a dedicated `docs/licensing.md` file.

---

## 9. Automating Workflows: Prompt Chaining and Skills

Once the manual process works for a single file, the natural next step is to automate it for batches. The way this works in practice is chaining discrete processing steps together in code, where each step calls an API or a local tool.

This section is here because it will become relevant once you've done a few items manually and start to see the patterns. It's not something you need to set up on day one.

### What is a "skill"?

A skill is a reusable, well-defined instruction set for a specific task. Think of it as a function that takes input and produces a predictable output. In practice, a skill is a prompt template (with structured instructions) plus any associated code. The idea is to write it once, test it on a few examples until it's reliable, then apply it uniformly across all inputs of that type.

This matters because a prompt that works well on one slide might fail on another if the instructions aren't precise enough. The iteration phase—running the prompt on 3–5 diverse examples and refining it—is what makes the difference between a fragile automation and a robust one.

### Example: A slide-description skill

To illustrate: suppose there are 200 slides to describe. The process looks like this:

1. Write a prompt that works well on 3–5 example slides, iterating until it produces consistent, accurate output across different slide types (text-heavy, diagram-heavy, mixed).
2. Save that prompt as a template with a placeholder for the image data.
3. Write a Python script that loops through slide images, calls the API with the template, and writes each result to a file.

```python
# batch_describe_slides.py (simplified)
import anthropic, base64, os

client = anthropic.Anthropic()

SKILL_PROMPT = '''You are converting a lecture slide to Markdown.
1. Extract ALL text exactly as shown.
2. Describe any diagrams, charts, or images in [brackets].
3. Include speaker notes if visible.
4. Use ## for the slide title, then bullet points for content.
5. For diagrams, describe the relationships/flow, not just the labels.'''

for img_file in sorted(os.listdir('slide_images/')):
    with open(f'slide_images/{img_file}', 'rb') as f:
        img_b64 = base64.standard_b64encode(f.read()).decode()
    resp = client.messages.create(
        model='claude-sonnet-4-20250514',
        max_tokens=2048,
        system=SKILL_PROMPT,
        messages=[{
            'role': 'user',
            'content': [
                { 'type': 'image',
                  'source': { 'type': 'base64', 'media_type': 'image/png',
                              'data': img_b64 } },
                { 'type': 'text', 'text': 'Convert this slide.' }
            ]
        }]
    )
    out_name = img_file.replace('.png', '.md')
    with open(f'slides_md/{out_name}', 'w') as f:
        f.write(resp.content[0].text)
```

### A general chaining pattern

Most conversion workflows end up following a similar chain:

`Raw source` → `Extraction` (deterministic tool) → `Cleaning` (scripted rules or LLM) → `Verification` (second extractor or LLM vision) → `Reconciliation` (diff + human review) → `Formatting` (to Markdown) → `Quality check`

Each arrow is a function call in a script. The principle is that deterministic steps (OCR, pandoc, text extraction) run first—they're fast, cheap, and reproducible. LLM calls come in for the parts that need judgment: describing diagrams, fixing OCR errors, structuring messy text. Keeping these concerns separated makes the pipeline easier to debug when something goes wrong (and something always goes wrong).

### Using chat tools effectively

A chat interface (like Claude) is genuinely useful for this work—for writing and debugging scripts, for repair and restructuring tasks, for describing diagrams. The thing to be intentional about is keeping the *results* of that work in the repository rather than only in the chat. If Claude helps you write a slide-extraction script, save the script to the `scripts/` folder. If it helps you clean up a transcript, save the cleaned transcript to the appropriate item folder. The chat is a tool; the repo is the record.

Any working environment is fine—IDE, terminal, notebook—as long as scripts, prompts, outputs, and QA records end up saved in the repository.

---

## 10. Tool Setup

Here's an overview of the tools that come up in this document. Everything here is open-source or API-based—no commercial software is needed. You won't need all of these; which ones matter depends on what source material you're working with.

| Tool | Install | Used For |
|------|---------|----------|
| `pandoc` | `apt / brew install pandoc` | Word, HTML, and other markup formats to Markdown (does **not** read PDFs) |
| Python 3 | python.org or system package | Running all scripts in this document |
| `pymupdf` | `pip install pymupdf` | PDF text extraction (text-selectable PDFs) |
| `pdfminer` | `pip install pdfminer.six` | PDF text extraction (alternative to pymupdf) |
| `ocrmypdf` | `pip install ocrmypdf` | OCR for scanned PDFs (`--mode skip` for mixed pages) |
| `pytesseract` | `pip install pytesseract` + tesseract | OCR via Python (wraps Tesseract engine) |
| `python-pptx` | `pip install python-pptx` | PowerPoint text and speaker notes extraction |
| Whisper | `pip install openai-whisper` | Audio/video transcription (local, open-source) |
| `ffmpeg` | `apt / brew install ffmpeg` | Splitting/converting media files |
| `anthropic` | `pip install anthropic` | Claude API calls (vision, cleaning, conversion) |
| `openpyxl` | `pip install openpyxl` | Excel/spreadsheet processing |

The API key for the `anthropic` library is an environment variable (`ANTHROPIC_API_KEY`) that gets set once and persists across scripts.

---

## 11. Reference: Approaches by Material Type

Section 4 introduced the concepts; this table is the part to come back to when you're sitting in front of a specific file and need to decide how to handle it. For each material type, there's a range of approaches. The right choice depends on how many files you have, how messy they are, and how comfortable you are with code.

| Material | Source formats | One at a time (chat) | At scale (code) | Common tools | Output format | Watch for |
|----------|---------------|----------------------|-----------------|--------------|---------------|-----------|
| **H2O Casebook** | HTML, Word export | Upload export to Claude, ask for Markdown conversion with structure preserved | Pandoc on Word exports; API calls for HTML with formatting instructions | pandoc (for .docx), Anthropic API | Markdown | Navigation chrome, annotation layers, JS artifacts in HTML exports; use official export to Word if available |
| **Text documents** (Word, study aids, outlines, model answers) | .docx, .doc, .txt, .rtf | Upload file, ask for Markdown conversion | Pandoc for batch conversion (`pandoc input.docx -t gfm -o output.md`); Python libraries for programmatic access; API calls for structured cleanup | pandoc, python-docx, Anthropic API | Markdown | Comments, tracked changes, headers/footers, two-column layouts; save raw text dump alongside cleaned version for debugging |
| **PDFs (text-selectable)** | .pdf with embedded text | Upload to Claude, ask for extraction and conversion; go section-by-section for long docs | Python PDF libraries for text extraction; run two tools and diff for high-confidence extraction | pymupdf, pdfminer, pypdf | Markdown | Multi-column reading order, footnotes merging into body, tables losing structure, sidebars losing context |
| **Scanned PDFs / images** | .pdf (image-only), .tiff, .png | Upload to Claude's vision, ask for text extraction with uncertainty flags | OCR engine for baseline extraction; vision-model pass for verification; diff and reconcile disagreements | Tesseract, ocrmypdf (`--mode skip` for mixed PDFs), pytesseract, Anthropic API (vision) | Markdown + keep OCR'd PDF | `l`/`1` and `O`/`0` swaps, missing § symbols, broken italics, footnote numbers in body text, column interleaving, header/footer repetition |
| **Slides** | .pptx, .pdf | Upload deck or slide images to Claude; ask for text extraction *and* diagram descriptions | Extract text/notes with python-pptx; export slides as images; send images to vision model for descriptions; combine into Markdown | python-pptx, Anthropic API (vision) | Markdown (text + descriptions) + slide images | SmartArt/charts/screenshots that carry meaning beyond labels; speaker notes with more substance than the slide face; keep slide number anchors |
| **Lecture videos** | .mp4, .mov, audio files | Upload to Claude for transcription (practical for ~10 min videos); split longer files with ffmpeg first | Whisper locally; use `--initial_prompt` with domain vocabulary (224-token limit); keep timing files (.vtt/.srt/.json) alongside transcripts | Whisper, ffmpeg, Anthropic API | Markdown transcript + timing file | Case names, statute numbers, Latin phrases; plan on a terminology correction pass; build a find-and-replace list of known terms |
| **Transcript cleanup** (post-transcription) | Raw transcript text | Paste transcript into Claude: "Segment into sections with headings, remove filler, preserve substantive content" | API calls with a consistent cleanup prompt looped across transcript files | Anthropic API | Structured Markdown with headings | Over-editing that changes meaning; losing the instructor's voice; filler removal that drops substantive asides |
| **Exams + model answers** | .docx, .pdf | Upload and convert; keep exam prompts and each model answer as separate files | Pandoc (for .docx) or API batch conversion; one output file per prompt, per model answer | pandoc, Anthropic API | Markdown (separate files) | Formatting that carries meaning (numbered sub-parts, point allocations); don't merge prompt and answers into one file |
| **Grading spreadsheets** | .xlsx, .xls, .csv | Upload to Claude to convert or inspect structure | Python libraries to export to CSV/JSON; or export directly from Excel/Sheets | openpyxl, pandas | CSV or JSON | Formulas exporting as bare values, merged cells creating blanks, multi-sheet workbooks, hidden tabs |
| **Cartoons / visuals** | .png, .jpg, .pdf | Upload to Claude; ask for literal description *and* explanation of the legal concept illustrated | API calls with consistent description prompt looped across image folder | Anthropic API (vision) | Markdown descriptions + original images kept in repo | Generic descriptions ("a cartoon about law"); prompt specifically about legal concepts, relationships, and any text within the image |

---

**A practical note on getting started:** the most useful first step is to pick one example of each material type and work through the full process for that one file. The manual pass is where you discover what these specific materials actually need—and those discoveries inform how the automation gets built. Don't try to set up the entire pipeline before you've seen what the materials look like up close.