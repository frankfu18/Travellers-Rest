import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";
import { getCardsForCategory, getCategory } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("drinks");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
});

export default function DrinksPage() {
  return <CategoryPage category={category} items={getCardsForCategory(category.slug)} />;
}
