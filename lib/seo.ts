import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createMetadata({ title, description, path, type = "website" }: SeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const baseOpenGraph = {
    title,
    description,
    url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/tavern-hero.png",
        width: 1536,
        height: 1024,
        alt: title,
      },
    ],
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: type === "article" ? { ...baseOpenGraph, type: "article" } : { ...baseOpenGraph, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/tavern-hero.png"],
    },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    dateModified: input.dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}${input.path}`,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
