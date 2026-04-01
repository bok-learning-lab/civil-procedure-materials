"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, FileText, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/content";

interface SidebarProps {
  navigation: NavItem[];
  folder: string;
  currentSlug: string;
  onLinkClick?: () => void;
}

export function Sidebar({
  navigation,
  folder,
  currentSlug,
  onLinkClick,
}: SidebarProps) {
  return (
    <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
      <ul className="space-y-1">
        {navigation.map((item) => (
          <NavItemComponent
            key={item.slug}
            item={item}
            folder={folder}
            currentSlug={currentSlug}
            basePath=""
            onLinkClick={onLinkClick}
          />
        ))}
      </ul>

      {/* Print all link */}
      <div className="mt-8 border-t pt-4">
        <Link
          href={`/${folder}/print-all`}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onLinkClick}
        >
          <Printer className="h-4 w-4" />
          Print All
        </Link>
      </div>
    </nav>
  );
}

interface NavItemComponentProps {
  item: NavItem;
  folder: string;
  currentSlug: string;
  basePath: string;
  onLinkClick?: () => void;
}

function NavItemComponent({
  item,
  folder,
  currentSlug,
  basePath,
  onLinkClick,
}: NavItemComponentProps) {
  const [isOpen, setIsOpen] = useState(true);

  const fullPath = basePath ? `${basePath}/${item.slug}` : item.slug;
  const isActive = currentSlug === fullPath || (item.slug === "index" && currentSlug === "");

  if (item.type === "link" && item.href) {
    return (
      <li>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          {item.title}
        </a>
      </li>
    );
  }

  if (item.type === "folder" && item.children) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-90"
            )}
          />
          {item.title}
        </button>
        {isOpen && (
          <ul className="ml-4 mt-1 space-y-1 border-l pl-2">
            {item.children.map((child) => (
              <NavItemComponent
                key={child.slug}
                item={child}
                folder={folder}
                currentSlug={currentSlug}
                basePath={fullPath}
                onLinkClick={onLinkClick}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // File type
  const href = item.slug === "index" ? `/${folder}` : `/${folder}/${fullPath}`;

  return (
    <li>
      <Link
        href={href}
        onClick={onLinkClick}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <FileText className="h-4 w-4" />
        {item.title}
      </Link>
    </li>
  );
}
