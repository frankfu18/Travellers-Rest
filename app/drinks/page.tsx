import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { drinks } from "@/data/drinks";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("drinks");

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

export default function DrinksPage() {
  return (
    <DatabaseListPage
      category={category}
      items={drinks.map((drink) => ({
        slug: drink.slug,
        name: drink.name,
        description: drink.description,
        category: drink.category,
        dataStatus: drink.dataStatus,
        href: getEntryPath(drink),
      }))}
    />
  );
}
