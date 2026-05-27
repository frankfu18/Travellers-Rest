import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { fish } from "@/data/fish";
import { getFish } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return fish.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getFish(slug);

  if (!item) {
    return createMetadata({ title: "Fish Not Found", description: "This Travellers Rest fish page is not available.", path: "/fish" });
  }

  return createMetadata({
    title: item.title,
    description: `Learn how to get, use, craft, or profit from ${item.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/fish/${item.slug}`,
    type: "article",
    keywords: item.keywords,
  });
}

export default async function FishDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getFish(slug);

  if (!item) notFound();

  return <DatabaseDetailPage entry={item} sectionName="Fish" sectionHref="/fish" />;
}
