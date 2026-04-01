# Project Name

Brief description of your project.

## Repository Structure

```text
_content/       # Markdown content (each folder = route)
apps/
  interface/    # Next.js web application (Tailwind + shadcn/ui)

packages/       # Shared packages (if any)
```

## Tech Stack

- **pnpm** — Package manager (monorepo workspaces)
- **Next.js** — React framework
- **Tailwind CSS v4** — Utility-first CSS
- **shadcn/ui** — Component library (uses Radix UI primitives)
- **MDX** — Markdown with JSX for documentation

## Working in This Repo

### Code

- Use `pnpm` for all package management (not npm or yarn)
- Prefer simple, readable solutions over abstraction
- Comment *why*, not just *what*

### Adding shadcn/ui Components

```bash
cd apps/interface
npx shadcn@latest add button card dialog input
```

### Adding Documentation

Create markdown files in `_content/[folder-name]/`:
- Each folder becomes a route (e.g., `_content/docs/` → `/docs`)
- Use `_meta.json` to control navigation order
- MDX files support custom components

### Commands

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm lint` — Run linting
