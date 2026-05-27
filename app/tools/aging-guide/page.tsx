import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { drinks } from "@/data/drinks";
import { recipes } from "@/data/recipes";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Aging Guide",
  description: "Learn how aging can fit into Travellers Rest drink and food planning with links to related recipes and drinks.",
  path: "/tools/aging-guide",
  keywords: ["Travellers Rest aging", "Travellers Rest aging guide", "Travellers Rest drinks aging"],
});

export default function AgingGuidePage() {
  const agingDrinks = drinks.filter((drink) => drink.aging.toLowerCase().includes("aging")).slice(0, 6);
  const relatedRecipes = recipes.filter((recipe) => recipe.category === "Baking").slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Aging Guide", href: "/tools/aging-guide" }]} />
      <h1 className="mt-8 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Aging Guide</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-300">
        Aging is a planning decision. Use it when the time investment fits your service route and when the item is worth holding instead of serving immediately.
      </p>
      <section className="mt-8 wood-panel rounded-lg p-5">
        <h2 className="text-2xl font-bold text-amber-50">How to Think About Aging</h2>
        <p className="mt-3 text-stone-300">
          Aging may affect drinks or other tavern products depending on the current game version. Because exact values can change, treat aging as a route choice: compare immediate service needs with the value of waiting.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-amber-50">Items That May Involve Aging</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agingDrinks.map((drink) => (
            <ContentCard key={drink.slug} item={{ title: drink.name, href: `/drinks/${drink.slug}`, description: drink.description, meta: drink.category }} />
          ))}
          {relatedRecipes.map((recipe) => (
            <ContentCard key={recipe.slug} item={{ title: recipe.name, href: `/recipes/${recipe.slug}`, description: recipe.description, meta: recipe.category }} />
          ))}
        </div>
        <div className="mt-5 flex gap-4 text-sm font-bold text-amber-200">
          <Link href="/drinks">Browse drinks</Link>
          <Link href="/recipes">Browse recipes</Link>
        </div>
      </section>
    </main>
  );
}
