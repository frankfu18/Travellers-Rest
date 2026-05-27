import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { crops } from "@/data/crops";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("crops");

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

export default function CropsPage() {
  return (
    <DatabaseListPage
      category={category}
      items={crops.map((crop) => ({
        slug: crop.slug,
        name: crop.name,
        description: crop.description,
        category: crop.category,
        dataStatus: crop.dataStatus,
        href: getEntryPath(crop),
      }))}
    />
  );
}
