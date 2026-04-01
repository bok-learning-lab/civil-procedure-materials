import { notFound } from "next/navigation";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getContentFolders, getDoc, getContentNavigation } from "./content";
import { DocsLayout } from "@/components/docs-layout";
import { MdxContent } from "@/components/mdx-content";
import { mdxComponents } from "@/components/mdx";

/**
 * Validates that a folder exists in _content/
 */
export function assertValidFolder(folder: string): void {
  const folders = getContentFolders();
  if (!folders.includes(folder)) {
    notFound();
  }
}

/**
 * Resolves the document path, handling index/README fallbacks
 */
export function resolveDocPath(folder: string, slug: string[]): string[] {
  // If no slug, try to get the index page
  if (slug.length === 0) {
    const indexDoc = getDoc(folder, ["index"]);
    if (indexDoc) return ["index"];

    const readmeDoc = getDoc(folder, ["README"]);
    if (readmeDoc) return ["README"];

    return [];
  }

  return slug;
}

/**
 * Compiles MDX source to a React component
 */
export async function compileDocToComponent(source: string) {
  const code = await compile(source, {
    outputFormat: "function-body",
    development: false,
  });

  const { default: MDXContent } = await run(String(code), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return MDXContent;
}

interface RenderContentPageOptions {
  folder: string;
  slug: string[];
}

/**
 * Renders a content page with layout
 */
export async function renderContentPage({ folder, slug }: RenderContentPageOptions) {
  const docPath = resolveDocPath(folder, slug);
  const doc = getDoc(folder, docPath);

  if (!doc) {
    notFound();
  }

  const navigation = getContentNavigation(folder);
  const MDXContent = await compileDocToComponent(doc.content);

  return (
    <DocsLayout
      navigation={navigation}
      folder={folder}
      currentSlug={slug.join("/")}
    >
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>{doc.metadata.title}</h1>
        {doc.metadata.description && (
          <p className="lead text-muted-foreground">{doc.metadata.description}</p>
        )}
        <MdxContent>
          <MDXContent components={mdxComponents} />
        </MdxContent>
      </article>
    </DocsLayout>
  );
}
