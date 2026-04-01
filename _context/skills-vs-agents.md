# Claude Skills vs. Agents

Both skills and agents are markdown files that give Claude instructions. The difference is *how* they run.

## Skills (`.claude/commands/`)

A skill is a **prompt template** that runs inline in your current conversation. When you type `/clean-pdf`, the markdown file gets injected into Claude's context as instructions. Claude follows those instructions using the tools it already has (Read, Write, Edit, etc.).

- Sees your full conversation history
- Works within your current session
- You watch it happen in real time
- Good for: interactive, one-file-at-a-time work

**Analogy:** handing someone a checklist while they're sitting next to you.

### Skills in this repo

| Skill | What it does |
|---|---|
| `/clean-pdf` | Extract text from a text-selectable PDF → markdown |
| `/clean-scan` | Vision-extract from a scanned PDF or image → markdown |
| `/clean-docx` | Convert a Word document → markdown |
| `/clean-slides` | Extract slide text + describe diagrams → markdown |
| `/clean-transcript` | Structure a raw transcript with headings → markdown |
| `/qa-check` | Verify a cleaned file (encoding, citations, structure) |

### When to use skills

- You have one file to process
- You want to see what's happening and intervene if needed
- You're working through a new material type for the first time
- You want to iterate on the output before moving on

---

## Agents (`.claude/agents/`)

An agent is a **separate process** with its own isolated context window. When Claude spawns an agent, it starts fresh — no conversation history, just a focused brief. It does its work independently and returns a summary when done.

- Does NOT see your conversation
- Runs in isolation (can even run in a separate git worktree)
- Multiple agents can run in parallel
- Returns a report when finished
- Good for: batch processing, heavy parallel work, keeping your main conversation clean

**Analogy:** sending someone to a separate room with a task description. They come back with a report.

### Agents in this repo

| Agent | What it does |
|---|---|
| `batch-pdf` | Process all unprocessed PDFs in a category's `original/` folder |
| `batch-scan` | Vision-extract all scanned PDFs/images in a category |
| `batch-docx` | Convert all Word documents in a category |
| `batch-slides` | Extract all slide decks in a category |
| `batch-transcript` | Structure all raw transcripts in a category |
| `batch-qa` | Run QA checks across all cleaned files in a category |

### When to use agents

- You have many files of the same type to process
- You've already tested the process on one file with a skill and it works
- You want to kick off a batch and do other things while it runs
- You want to process multiple categories in parallel

---

## The workflow

1. **Start with a skill.** Pick one file of each type. Run the matching `/clean-*` skill interactively. Review the output. This is where you discover what these specific materials need.

2. **Switch to agents for batch work.** Once you're confident the process works for a given type, use the matching `batch-*` agent to process the rest. You can run multiple agents in parallel (e.g., batch-process all PDFs in `casebook/` and all transcripts in `lectures/` at the same time).

3. **QA everything.** Run `/qa-check` on individual files, or use the `batch-qa` agent to sweep a whole category.

---

## Key differences at a glance

| | Skill | Agent |
|---|---|---|
| **Invoked with** | `/skill-name` | Claude decides to spawn, or you ask for it |
| **Context** | Shares your conversation | Fresh, isolated context |
| **Parallelism** | One at a time | Multiple can run simultaneously |
| **Visibility** | You see every step | Returns a summary at the end |
| **Best for** | Interactive, exploratory, one-off | Batch, parallel, heavy lifting |
| **Files live in** | `.claude/commands/` | `.claude/agents/` |
| **Defined by** | Markdown with instructions | Markdown with YAML frontmatter + instructions |
