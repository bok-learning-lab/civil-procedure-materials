import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">Your Project</h1>
        <p className="mt-4 text-muted-foreground">
          Edit <code className="rounded bg-muted px-1.5 py-0.5 text-sm">app/page.tsx</code> to get started.
        </p>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/docs">View Documentation</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://ui.shadcn.com/docs/components"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui Components
            </a>
          </Button>
        </div>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Quick Links</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <Link href="/docs" className="text-foreground underline underline-offset-4 hover:text-primary">
                Documentation
              </Link>
              {" "}&mdash; Learn how to use this template
            </li>
            <li>
              <Link href="/docs/getting-started" className="text-foreground underline underline-offset-4 hover:text-primary">
                Getting Started
              </Link>
              {" "}&mdash; Set up your development environment
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
