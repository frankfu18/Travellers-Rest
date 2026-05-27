import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { crops } from "@/data/crops";
import { getCrop } from "@/lib/content";
import { createMetadata, databaseRobots } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCrop(slug);

  if (!crop) {
    return createMetadata({ title: "Crop Not Found", description: "This Travellers Rest crop page is not available.", path: "/crops" });
  }

  return createMetadata({
    title: crop.title,
    description: `Learn how to get, use, craft, or profit from ${crop.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/crops/${crop.slug}`,
    type: "article",
    keywords: crop.keywords,
    robots: databaseRobots(crop.dataStatus),
  });
}

export default async function CropPage({ params }: PageProps) {
  const { slug } = await params;
  const crop = getCrop(slug);

  if (!crop) notFound();

  return <DatabaseDetailPage entry={crop} sectionName="Crops" sectionHref="/crops" />;
}
