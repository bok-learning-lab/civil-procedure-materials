"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import type { NavItem } from "@/lib/content";

interface DocsLayoutProps {
  navigation: NavItem[];
  folder: string;
  currentSlug: string;
  children: React.ReactNode;
}

export function DocsLayout({
  navigation,
  folder,
  currentSlug,
  children,
}: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <span className="font-semibold capitalize">{folder}</span>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out
            lg:static lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="sticky top-0 flex h-14 items-center border-b px-4">
            <Link href="/" className="font-semibold">
              Your Project
            </Link>
          </div>
          <Sidebar
            navigation={navigation}
            folder={folder}
            currentSlug={currentSlug}
            onLinkClick={() => setSidebarOpen(false)}
          />
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 px-6 py-8 lg:px-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
