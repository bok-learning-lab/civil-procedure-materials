interface MdxContentProps {
  children: React.ReactNode;
}

export function MdxContent({ children }: MdxContentProps) {
  return <div className="mdx-content">{children}</div>;
}
