import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Path to _content directory at the monorepo root
const contentDirectory = path.join(process.cwd(), "../../_content");

export interface DocMetadata {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface Doc {
  slug: string;
  metadata: DocMetadata;
  content: string;
}

export interface NavItem {
  title: string;
  slug: string;
  type: "file" | "folder" | "link";
  href?: string;
  children?: NavItem[];
}

/**
 * Gets all content folders (e.g., "docs", "guides")
 */
export function getContentFolders(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => !dirent.name.startsWith("."))
    .map((dirent) => dirent.name);
}

/**
 * Reads _meta.json from a directory if it exists
 */
function readMeta(dirPath: string): Record<string, string | { title: string; href: string }> {
  const metaPath = path.join(dirPath, "_meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

/**
 * Builds navigation tree for a content folder
 */
export function getContentNavigation(folder: string): NavItem[] {
  const folderPath = path.join(contentDirectory, folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  return buildNavTree(folderPath, folder);
}

function buildNavTree(dirPath: string, basePath: string): NavItem[] {
  const meta = readMeta(dirPath);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const items: NavItem[] = [];
  const processedKeys = new Set<string>();

  // First, process items in _meta.json order
  for (const [key, value] of Object.entries(meta)) {
    processedKeys.add(key);

    // Check if it's an external link
    if (typeof value === "object" && value.href) {
      items.push({
        title: value.title,
        slug: key,
        type: "link",
        href: value.href,
      });
      continue;
    }

    const title = typeof value === "string" ? value : key;

    // Check for folder
    const folderEntry = entries.find(
      (e) => e.isDirectory() && e.name === key
    );
    if (folderEntry) {
      const childPath = path.join(dirPath, key);
      items.push({
        title,
        slug: key,
        type: "folder",
        children: buildNavTree(childPath, `${basePath}/${key}`),
      });
      continue;
    }

    // Check for file (.md or .mdx)
    const fileEntry = entries.find(
      (e) =>
        e.isFile() &&
        (e.name === `${key}.md` || e.name === `${key}.mdx`)
    );
    if (fileEntry) {
      items.push({
        title,
        slug: key,
        type: "file",
      });
    }
  }

  // Then, add any items not in _meta.json
  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) {
      continue;
    }

    if (entry.isDirectory()) {
      if (!processedKeys.has(entry.name)) {
        const childPath = path.join(dirPath, entry.name);
        items.push({
          title: formatTitle(entry.name),
          slug: entry.name,
          type: "folder",
          children: buildNavTree(childPath, `${basePath}/${entry.name}`),
        });
      }
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      const slug = entry.name.replace(/\.mdx?$/, "");
      if (!processedKeys.has(slug)) {
        items.push({
          title: formatTitle(slug),
          slug,
          type: "file",
        });
      }
    }
  }

  return items;
}

function formatTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Gets a specific document by folder and slug path
 */
export function getDoc(folder: string, slugPath: string[]): Doc | null {
  const folderPath = path.join(contentDirectory, folder);

  // Try different file extensions and paths
  const possiblePaths = [
    path.join(folderPath, ...slugPath) + ".md",
    path.join(folderPath, ...slugPath) + ".mdx",
    path.join(folderPath, ...slugPath, "index.md"),
    path.join(folderPath, ...slugPath, "index.mdx"),
    path.join(folderPath, ...slugPath, "README.md"),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: slugPath.join("/"),
        metadata: {
          title: data.title || formatTitle(slugPath[slugPath.length - 1] || folder),
          description: data.description,
          ...data,
        },
        content,
      };
    }
  }

  return null;
}

/**
 * Gets all document paths for static generation
 */
export function getAllDocPaths(folder: string): string[][] {
  const folderPath = path.join(contentDirectory, folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const paths: string[][] = [];
  collectPaths(folderPath, [], paths);

  return paths;
}

function collectPaths(dirPath: string, currentPath: string[], paths: string[][]): void {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) {
      continue;
    }

    if (entry.isDirectory()) {
      collectPaths(
        path.join(dirPath, entry.name),
        [...currentPath, entry.name],
        paths
      );
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      const slug = entry.name.replace(/\.mdx?$/, "");
      // Skip index/README as they're handled by the parent path
      if (slug !== "index" && slug !== "README") {
        paths.push([...currentPath, slug]);
      } else if (currentPath.length > 0) {
        // Add parent path for index files in subdirectories
        paths.push(currentPath);
      }
    }
  }
}
