import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { craftingStations } from "@/data/crafting-stations";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("crafting");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
  keywords: category.keywords,
  robots: {
    index: false,
    follow: true,
  },
});

export default function CraftingPage() {
  return (
    <DatabaseListPage
      category={category}
      items={craftingStations.map((station) => ({
        slug: station.slug,
        name: station.name,
        description: station.description,
        category: station.category,
        dataStatus: station.dataStatus,
        href: getEntryPath(station),
      }))}
    />
  );
}
