import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { recipes } from "@/data/recipes";
import { getRecipe, getRelatedGuides } from "@/lib/content";
import { articleSchema, breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";

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
    return createMetadata({
      title: "Recipe Not Found",
      description: "This Travellers Rest recipe page is not available yet.",
      path: "/recipes",
    });
  }

  return createMetadata({
    title: `${recipe.name} Recipe - Travellers Rest`,
    description: recipe.description,
    path: `/recipes/${recipe.slug}`,
    type: "article",
    keywords: recipe.keywords,
  });
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  const path = `/recipes/${recipe.slug}`;
  const relatedGuides = getRelatedGuides(path);
  const toc = [
    { id: "overview", title: "Overview" },
    { id: "ingredients", title: "Ingredients" },
    { id: "crafting", title: "Crafting Notes" },
    { id: "faq-heading", title: "FAQ" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <JsonLd
        data={[
          articleSchema({
            title: `${recipe.name} Recipe - Travellers Rest`,
            description: recipe.description,
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Recipes", path: "/recipes" },
            { name: recipe.name, path },
          ]),
          faqSchema(recipe.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Recipes", href: "/recipes" },
          { name: recipe.name, href: path },
        ]}
      />
      <article className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">{recipe.category}</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{recipe.name} Recipe</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{recipe.description}</p>

          <section id="overview" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Overview</h2>
            <p className="mt-3 text-stone-300">
              {recipe.name} is a {recipe.category.toLowerCase()} entry designed for static recipe pages. The data shape
              supports long-tail keywords like Travellers Rest {recipe.name} ingredients, unlock level, crafting station,
              and sell price.
            </p>
          </section>

          <section id="ingredients" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Ingredients</h2>
            <ul className="mt-3 grid gap-2 text-stone-300 sm:grid-cols-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="rounded border border-amber-200/15 bg-[#1a100b] px-4 py-3">
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section id="crafting" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Crafting Notes</h2>
            <p className="mt-3 text-stone-300">
              Craft this recipe at the {recipe.craftingStation}. It unlocks around level {recipe.unlockLevel} in this
              mock dataset and sells for about {recipe.sellPrice} coins.
            </p>
          </section>

          <div className="mt-10">
            <Faq items={recipe.faq} />
          </div>

          <section className="mt-10" aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading" className="text-2xl font-bold text-amber-50">
              Related Guides
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {relatedGuides.map((item) => (
                <ContentCard key={item.href} item={item} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={toc} />
          <InfoTable
            rows={[
              { label: "Category", value: recipe.category },
              { label: "Sell Price", value: `${recipe.sellPrice} coins` },
              { label: "Ingredients", value: recipe.ingredients.join(", ") },
              { label: "Station", value: recipe.craftingStation },
              { label: "Unlock Level", value: recipe.unlockLevel },
              { label: "Prep Time", value: recipe.prepTime },
            ]}
          />
        </aside>
      </article>
    </main>
  );
}
