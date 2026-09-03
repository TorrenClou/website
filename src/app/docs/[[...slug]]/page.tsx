import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { source } from "@/lib/source";
import { ConfigTable, ConfigSchemaVersion } from "@/components/ConfigTable";
import { siteConfig, absoluteUrl } from "@/lib/site";
import lastmod from "@/lib/lastmod.json";
import type { DocsPageProps } from "@/types";

const dates = lastmod as Record<string, string>;

function ogImageFor(title: string, description: string): string {
  const params = new URLSearchParams({
    title,
    description,
    type: "docs",
  });
  return `/api/og?${params.toString()}`;
}

export default async function Page({ params }: DocsPageProps) {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const slug = page.url.replace(/^\/docs\/?/, "");
  const modified = dates[slug];

  // Structured data for each documentation page. Without it the only machine
  // readable description of this site was a single SoftwareApplication block on
  // the landing page, so a search engine or an assistant had nothing telling it
  // what an individual page covered or where it sat in the hierarchy.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${absoluteUrl(page.url)}#article`,
        headline: page.data.title,
        description: page.data.description,
        url: absoluteUrl(page.url),
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          name: `${siteConfig.name} Documentation`,
          url: absoluteUrl(siteConfig.docsPath),
        },
        about: {
          "@type": "SoftwareApplication",
          name: siteConfig.name,
          applicationCategory: "UtilitiesApplication",
        },
        author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.github },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.github },
        license: `${siteConfig.github}/deploy/blob/main/LICENSE`,
        ...(modified ? { dateModified: modified } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(page.url)}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Documentation",
            item: absoluteUrl(siteConfig.docsPath),
          },
          ...(slug
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: page.data.title,
                  item: absoluteUrl(page.url),
                },
              ]
            : []),
        ],
      },
    ],
  };

  return (
    <DocsPage toc={page.data.toc}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        {/*
          Components have to be handed to the body explicitly. The root
          mdx-components.tsx is the @next/mdx convention, which fumadocs-mdx
          does not read — registering them only there compiles fine and then
          fails at prerender with "Expected component to be defined".
        */}
        <MDXContent
          components={{
            ...defaultMdxComponents,
            ConfigTable,
            ConfigSchemaVersion,
          }}
        />
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

  const description = page.data.description ?? siteConfig.description;

  return {
    title: page.data.title,
    description,
    alternates: {
      canonical: absoluteUrl(page.url),
    },
    openGraph: {
      type: "article",
      title: page.data.title,
      description,
      url: absoluteUrl(page.url),
      images: [
        {
          url: ogImageFor(page.data.title, description),
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
  };
}
