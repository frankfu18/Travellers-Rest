import type { Metadata } from "next";
import { DatabaseListPage } from "@/components/database-list-page";
import { recipes } from "@/data/recipes";
import { getCategory, getEntryPath } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const category = getCategory("recipes");

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

export default function RecipesPage() {
  return (
    <DatabaseListPage
      category={category}
      items={recipes.map((recipe) => ({
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        category: recipe.category,
        dataStatus: recipe.dataStatus,
        href: getEntryPath(recipe),
      }))}
    />
  );
}
