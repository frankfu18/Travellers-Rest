import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { DataStatus } from "@/types/content";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  robots?: Metadata["robots"];
};

export function createMetadata({ title, description, path, type = "website", keywords, robots }: SeoInput): Metadata {
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
    keywords,
    robots,
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

export function databaseRobots(status: DataStatus): Metadata["robots"] {
  const canIndex = status === "verified" || status === "completed";

  return {
    index: canIndex,
    follow: true,
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
