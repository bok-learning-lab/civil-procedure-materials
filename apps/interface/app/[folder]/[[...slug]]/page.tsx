import { getContentFolders, getDoc, getAllDocPaths } from "@/lib/content";
import {
  assertValidFolder,
  resolveDocPath,
  renderContentPage,
} from "@/lib/content-page";

interface PageProps {
  params: Promise<{
    folder: string;
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const folders = getContentFolders();
  const allParams: { folder: string; slug: string[] }[] = [];

  for (const folder of folders) {
    const paths = getAllDocPaths(folder);

    // Add root path for the folder
    allParams.push({ folder, slug: [] });

    // Add all document paths
    for (const slug of paths) {
      allParams.push({ folder, slug });
    }
  }

  return allParams;
}

export async function generateMetadata({ params }: PageProps) {
  const { folder, slug = [] } = await params;

  if (!getContentFolders().includes(folder)) {
    return {};
  }

  const docPath = resolveDocPath(folder, slug);
  const doc = getDoc(folder, docPath);

  return {
    title: doc?.metadata.title || folder,
    description: doc?.metadata.description || `Documentation for ${folder}`,
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { folder, slug = [] } = await params;
  assertValidFolder(folder);
  return renderContentPage({ folder, slug });
}
