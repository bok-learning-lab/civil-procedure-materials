import { getContentFolders, getAllDocPaths, getDoc } from "@/lib/content";
import { compileDocToComponent } from "@/lib/content-page";
import { MdxContent } from "@/components/mdx-content";
import { mdxComponents } from "@/components/mdx";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    folder: string;
  }>;
}

export async function generateStaticParams() {
  const folders = getContentFolders();
  return folders.map((folder) => ({ folder }));
}

export async function generateMetadata({ params }: PageProps) {
  const { folder } = await params;

  if (!getContentFolders().includes(folder)) {
    return {};
  }

  return {
    title: `Print All - ${folder}`,
    description: `All documentation for ${folder} on a single page`,
  };
}

export default async function PrintAllPage({ params }: PageProps) {
  const { folder } = await params;

  if (!getContentFolders().includes(folder)) {
    notFound();
  }

  const paths = getAllDocPaths(folder);

  // Get all docs including index
  const allPaths = [["index"], ...paths];
  const docs = allPaths
    .map((path) => getDoc(folder, path))
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null);

  const compiledDocs = await Promise.all(
    docs.map(async (doc) => ({
      ...doc,
      Component: await compileDocToComponent(doc.content),
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-bold capitalize">{folder}</h1>
          <p className="mt-2 text-muted-foreground">
            All documentation on a single page for printing
          </p>
        </header>

        <div className="space-y-16">
          {compiledDocs.map((doc, index) => (
            <article
              key={doc.slug}
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              {index > 0 && <hr className="my-12" />}
              <h2>{doc.metadata.title}</h2>
              {doc.metadata.description && (
                <p className="lead text-muted-foreground">
                  {doc.metadata.description}
                </p>
              )}
              <MdxContent>
                <doc.Component components={mdxComponents} />
              </MdxContent>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
