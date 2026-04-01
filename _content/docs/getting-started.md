---
title: Getting Started
description: How to get started with this project
---

# Getting Started

Follow these steps to set up your development environment.

## Prerequisites

- Node.js 18 or later
- pnpm (`npm install -g pnpm`)

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Project Structure

```
your-project/
├── _content/           # Markdown content
│   └── docs/           # Documentation files
├── apps/
│   └── interface/      # Next.js application
│       ├── app/        # App router pages
│       ├── components/ # React components
│       └── lib/        # Utilities
└── packages/           # Shared packages
```

## Adding Components

This template uses [shadcn/ui](https://ui.shadcn.com) for components. Add new components with:

```bash
cd apps/interface
npx shadcn@latest add button card dialog
```

## Next Steps

- Edit `app/page.tsx` to customize the home page
- Add markdown files to `_content/docs/` for documentation
- Explore [shadcn/ui components](https://ui.shadcn.com/docs/components)
