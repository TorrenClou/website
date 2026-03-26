export interface DocsFrontmatter {
  title: string;
  description: string;
}

export interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}
