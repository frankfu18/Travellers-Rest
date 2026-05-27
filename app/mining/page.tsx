import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";
import { getCardsForCategory, getCategory } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("mining");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
});

export default function MiningPage() {
  return <CategoryPage category={category} items={getCardsForCategory(category.slug)} />;
}
