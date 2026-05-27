import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatabaseDetailPage } from "@/components/database-detail-page";
import { drinks } from "@/data/drinks";
import { getDrink } from "@/lib/content";
import { createMetadata, databaseRobots } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return drinks.map((drink) => ({ slug: drink.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const drink = getDrink(slug);

  if (!drink) {
    return createMetadata({ title: "Drink Not Found", description: "This Travellers Rest drink page is not available.", path: "/drinks" });
  }

  return createMetadata({
    title: drink.title,
    description: `Learn how to get, use, craft, or profit from ${drink.name} in Travellers Rest. Includes ingredients, stations, related recipes, and beginner tips.`,
    path: `/drinks/${drink.slug}`,
    type: "article",
    keywords: drink.keywords,
    robots: databaseRobots(drink.dataStatus),
  });
}

export default async function DrinkPage({ params }: PageProps) {
  const { slug } = await params;
  const drink = getDrink(slug);

  if (!drink) notFound();

  return <DatabaseDetailPage entry={drink} sectionName="Drinks" sectionHref="/drinks" />;
}
