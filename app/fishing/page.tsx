import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";
import { getCardsForCategory, getCategory } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("fishing");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
  keywords: category.keywords,
});

export default function FishingPage() {
  return <CategoryPage category={category} items={getCardsForCategory(category.slug)} />;
}
