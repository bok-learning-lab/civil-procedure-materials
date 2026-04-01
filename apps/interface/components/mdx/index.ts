import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Global MDX components available in all MDX files.
 * These components can be used directly in .mdx files without importing.
 */
export const mdxComponents: MDXComponents = {
  // shadcn/ui components
  Button,
  Badge,
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
