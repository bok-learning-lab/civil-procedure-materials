# Setup Guide: Getting Started in One Hour

This walks you through everything you need to get from zero to your first cleaned markdown file.

## What you'll need

- A laptop (Mac or Windows)
- A PDF of a civil procedure document (bring one — a casebook chapter, old exam, study aid, anything)
- About an hour

## Step 1: Install VS Code (5 min)

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download the version for your operating system (Mac or Windows)
3. Install it — just follow the default prompts

## Step 2: Install the Claude Code extension (5 min)

1. Open VS Code
2. Click the **Extensions** icon in the left sidebar (it looks like four squares)
3. Search for **"Claude Code"**
4. Click **Install**
5. Once installed, you'll see a Claude icon in the left sidebar — click it
6. It will ask you to sign in — follow the prompts to authenticate with your Anthropic account

> If you don't have an Anthropic account yet, you'll need to create one at [https://console.anthropic.com](https://console.anthropic.com). Ask your supervisor if there's a shared team account or API key.

## Step 3: Create your Development folder (2 min)

Open a terminal (in VS Code: **Terminal → New Terminal** from the menu bar, or `` Ctrl+` ``).

**Mac:**
```bash
mkdir -p ~/Development
cd ~/Development
```

**Windows:**
```bash
mkdir C:\Development
cd C:\Development
```

## Step 4: Clone the repository (3 min)

Still in the terminal:

```bash
git clone https://github.com/bok-learning-lab/civil-procedure-materials.git
cd civil-procedure-materials
```

Then open the folder in VS Code: **File → Open Folder** → navigate to `Development/civil-procedure-materials` → click **Open**.

> **If you've never used git before:** Git is version control — it tracks changes and lets the whole team work on the same files without overwriting each other. You only need four commands:
>
> | Command | What it does |
> |---|---|
> | `git pull` | Get the latest changes from the team |
> | `git add .` | Stage your changes |
> | `git commit -m "description"` | Save your changes locally with a note |
> | `git push` | Upload your changes so the team can see them |
>
> **Always `git pull` before you start working.** This avoids conflicts with other people's changes.

## Step 5: Look around (5 min)

In the VS Code file explorer (left sidebar), you'll see the folder structure:

```
casebook/original/    casebook/cleaned/
lectures/original/    lectures/cleaned/
exams/original/       exams/cleaned/
...
```

- `original/` is where raw source files go — PDFs, Word docs, slides, etc.
- `cleaned/` is where the extracted markdown ends up

Open the README for a quick overview.

## Step 6: Add your practice file (2 min)

1. Take the PDF you brought
2. Rename it to follow the naming convention: **lowercase, hyphens, no spaces**
   - `Final Exam 2024.pdf` → `2024-final.pdf`
   - `Ch. 1 Personal Jurisdiction.pdf` → `ch01-personal-jurisdiction.pdf`
3. Drag it into the appropriate `original/` folder
   - An exam → `exams/original/`
   - A casebook chapter → `casebook/original/`
   - A study aid → `study-aids/original/`

## Step 7: Run a Claude skill to clean it (10 min)

1. Open the Claude Code panel (click the Claude icon in the left sidebar)
2. Type `/clean-pdf` and press Enter
3. Claude will ask which file to process — tell it the path (e.g., `exams/original/2024-final.pdf`)
4. Watch it work — it will:
   - Read the PDF
   - Extract and structure the text
   - Add YAML frontmatter
   - Insert page anchors
   - Save the result in `cleaned/`
5. Review the output — open the new `.md` file in `cleaned/` and check:
   - Does the structure look right? (headings, sections)
   - Are case names italicized? (*International Shoe*, not International Shoe)
   - Are there any garbled tables or weird artifacts?
   - Did page anchors get inserted? (`<!-- page: 1 -->`)

> **If your PDF is scanned** (you can't highlight text in it), use `/clean-scan` instead of `/clean-pdf`.
>
> **If your file is a Word doc**, use `/clean-docx`.

## Step 8: Commit and push your work (5 min)

In the terminal:

```bash
git pull                           # get any changes from teammates
git add .                          # stage your new files
git commit -m "Add and clean [describe your file]"   # save locally
git push                           # upload to the shared repo
```

Example:
```bash
git commit -m "Add and clean 2024 final exam"
```

## Step 9: Run QA (5 min)

Type `/qa-check` in Claude Code and point it at your cleaned file. It will verify:
- Encoding is clean (no garbled characters)
- Frontmatter is present
- Structure and citations look right
- No conversion artifacts

Fix anything it flags, then commit again.

---

## Troubleshooting

**"Permission denied" or "Authentication failed" on git push:**
You may need to set up a GitHub personal access token or SSH key. Ask your supervisor for the team's preferred method.

**Claude Code isn't responding:**
Make sure you're signed in (click the Claude icon → check for a sign-in prompt). If it's still not working, try reloading VS Code (Cmd+Shift+P → "Reload Window").

**The PDF extraction looks terrible:**
Some PDFs are harder than others. Try:
- `/clean-scan` instead of `/clean-pdf` (uses vision instead of text extraction)
- Processing a few pages at a time instead of the whole document
- Asking Claude directly in the chat panel to help fix specific sections

**Merge conflicts when pushing:**
This means someone else changed the same file. Run:
```bash
git pull
```
If it says there's a conflict, ask for help — merge conflicts are normal and not a crisis, but they're easier to resolve with someone who's done it before.

---

## What's next

Once you've done one file end to end, you know the process. From here:
- Pick more files from the materials you've been assigned
- Use the matching `/clean-*` skill for each type
- When you have a batch of the same type, ask Claude to use a batch agent instead
- See `_context/ta-workflow.md` for the full workflow reference
- See `_context/skills-vs-agents.md` for when to use skills vs. agents
