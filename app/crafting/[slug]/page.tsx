import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { craftingStations } from "@/data/crafting-stations";
import { getCraftingStation } from "@/lib/content";
import { createMetadata, databaseRobots } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return craftingStations.map((station) => ({ slug: station.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = getCraftingStation(slug);

  if (!station) {
    return createMetadata({ title: "Crafting Station Not Found", description: "This Travellers Rest crafting station page is not available.", path: "/crafting" });
  }

  return createMetadata({
    title: station.title,
    description: `Learn how to get, use, craft, or profit from ${station.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/crafting/${station.slug}`,
    type: "article",
    keywords: station.keywords,
    robots: databaseRobots(station.dataStatus),
  });
}

export default async function CraftingStationPage({ params }: PageProps) {
  const { slug } = await params;
  const station = getCraftingStation(slug);

  if (!station) notFound();

  return <DatabaseDetailPage entry={station} sectionName="Crafting" sectionHref="/crafting" />;
}
