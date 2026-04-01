# Project Name

Brief description.

## Tech Stack

- [pnpm](https://pnpm.io/) — Fast, disk space efficient package manager
- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautifully designed components

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Adding Components

This template uses shadcn/ui. To add new components:

```bash
cd apps/interface
npx shadcn@latest add button card dialog
```

See the [shadcn/ui docs](https://ui.shadcn.com/docs/components) for available components.

## Structure

- `_content/` — Markdown documentation (each folder = route)
- `apps/interface` — Next.js web application
- `packages/` — Shared packages
