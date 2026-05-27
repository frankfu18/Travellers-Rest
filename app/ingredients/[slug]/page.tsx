import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { ingredients } from "@/data/ingredients";
import { getIngredient } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: ingredient.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    return createMetadata({ title: "Ingredient Not Found", description: "This Travellers Rest ingredient page is not available.", path: "/ingredients" });
  }

  return createMetadata({
    title: ingredient.title,
    description: `Learn how to get, use, craft, or profit from ${ingredient.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/ingredients/${ingredient.slug}`,
    type: "article",
    keywords: ingredient.keywords,
  });
}

export default async function IngredientPage({ params }: PageProps) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) notFound();

  return <DatabaseDetailPage entry={ingredient} sectionName="Ingredients" sectionHref="/ingredients" />;
}
