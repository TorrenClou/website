import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { source } from "@/lib/source";
import type { DocsPageProps } from "@/types";

export default async function Page({ params }: DocsPageProps) {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `https://tc.gitnasr.com${page.url}`,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `https://tc.gitnasr.com${page.url}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(page.data.title)}&description=${encodeURIComponent(page.data.description ?? "")}&type=docs`,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
  };
}
