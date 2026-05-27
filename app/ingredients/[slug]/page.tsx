import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { ingredients } from "@/data/ingredients";
import { getIngredient, getRelatedGuides } from "@/lib/content";
import { articleSchema, breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";

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
    return createMetadata({
      title: "Ingredient Not Found",
      description: "This Travellers Rest ingredient page is not available yet.",
      path: "/ingredients",
    });
  }

  return createMetadata({
    title: `${ingredient.name} - Travellers Rest Ingredient`,
    description: ingredient.description,
    path: `/ingredients/${ingredient.slug}`,
    type: "article",
    keywords: ingredient.keywords,
  });
}

export default async function IngredientPage({ params }: PageProps) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    notFound();
  }

  const path = `/ingredients/${ingredient.slug}`;
  const relatedGuides = getRelatedGuides(path);
  const toc = [
    { id: "overview", title: "Overview" },
    { id: "uses", title: "Uses" },
    { id: "source", title: "Source" },
    { id: "faq-heading", title: "FAQ" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <JsonLd
        data={[
          articleSchema({
            title: `${ingredient.name} - Travellers Rest Ingredient`,
            description: ingredient.description,
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ingredients", path: "/ingredients" },
            { name: ingredient.name, path },
          ]),
          faqSchema(ingredient.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Ingredients", href: "/ingredients" },
          { name: ingredient.name, href: path },
        ]}
      />
      <article className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">{ingredient.category}</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{ingredient.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{ingredient.description}</p>

          <section id="overview" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Overview</h2>
            <p className="mt-3 text-stone-300">
              {ingredient.name} is stored as a typed ingredient record so AI-generated content can consistently fill
              category, source, value, unlock, and related recipe fields.
            </p>
          </section>

          <section id="uses" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Uses</h2>
            <p className="mt-3 text-stone-300">
              Use this entry as a hub for recipes, brewing chains, farming plans, and tavern menu optimization notes.
            </p>
          </section>

          <section id="source" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Source</h2>
            <p className="mt-3 text-stone-300">
              Source: {ingredient.source}. Unlock level: {ingredient.unlockLevel}. Mock sell price: {ingredient.sellPrice} coins.
            </p>
          </section>

          <div className="mt-10">
            <Faq items={ingredient.faq} />
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
              { label: "Category", value: ingredient.category },
              { label: "Sell Price", value: `${ingredient.sellPrice} coins` },
              { label: "Source", value: ingredient.source },
              { label: "Station", value: ingredient.craftingStation },
              { label: "Unlock Level", value: ingredient.unlockLevel },
            ]}
          />
        </aside>
      </article>
    </main>
  );
}
