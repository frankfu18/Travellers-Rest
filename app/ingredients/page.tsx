import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { ingredients } from "@/data/ingredients";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("ingredients");

export const metadata: Metadata = createMetadata({
  title: category.title,
  description: category.description,
  path: category.href,
  keywords: category.keywords,
});

export default function IngredientsPage() {
  return (
    <DatabaseListPage
      category={category}
      items={ingredients.map((ingredient) => ({
        slug: ingredient.slug,
        name: ingredient.name,
        description: ingredient.description,
        category: ingredient.category,
        dataStatus: ingredient.dataStatus,
        href: getEntryPath(ingredient),
      }))}
    />
  );
}
