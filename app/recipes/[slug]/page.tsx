import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { recipes } from "@/data/recipes";
import { getRecipe } from "@/lib/content";
import { createMetadata, databaseRobots } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) {
    return createMetadata({ title: "Recipe Not Found", description: "This Travellers Rest recipe page is not available.", path: "/recipes" });
  }

  return createMetadata({
    title: recipe.title,
    description: `Learn how to get, use, craft, or profit from ${recipe.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/recipes/${recipe.slug}`,
    type: "article",
    keywords: recipe.keywords,
    robots: databaseRobots(recipe.dataStatus),
  });
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) notFound();

  return <DatabaseDetailPage entry={recipe} sectionName="Recipes" sectionHref="/recipes" />;
}
