import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Spread our registered MDX components
    ...mdxComponents,
    // Allow overrides from individual pages
    ...components,
  };
}
