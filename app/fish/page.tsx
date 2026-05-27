import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { fish } from "@/data/fish";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("fish");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
  keywords: category.keywords,
});

export default function FishPage() {
  return (
    <DatabaseListPage
      category={category}
      items={fish.map((item) => ({
        slug: item.slug,
        name: item.name,
        description: item.description,
        category: item.category,
        dataStatus: item.dataStatus,
        href: getEntryPath(item),
      }))}
    />
  );
}
