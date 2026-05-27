import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { drinks } from "@/data/drinks";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Brewing Guide",
  description: "Step-by-step brewing guide for Travellers Rest with drink categories and related drink database links.",
  path: "/tools/brewing-guide",
  keywords: ["Travellers Rest brewing guide", "Travellers Rest drinks", "Travellers Rest beer"],
});

export default function BrewingGuidePage() {
  const relatedDrinks = drinks.slice(0, 6).map((drink) => ({
    title: drink.name,
    href: `/drinks/${drink.slug}`,
    description: drink.description,
    meta: drink.category,
  }));
  const categories = Array.from(new Set(drinks.map((drink) => drink.category))).sort();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Brewing Guide", href: "/tools/brewing-guide" }]} />
      <h1 className="mt-8 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Brewing Guide</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-300">Use brewing as a supply chain: ingredients, station time, service demand, and aging decisions all matter.</p>
      <section className="mt-8 wood-panel rounded-lg p-5">
        <h2 className="text-2xl font-bold text-amber-50">Brewing Step-by-Step</h2>
        <ol className="mt-4 space-y-3 text-stone-300">
          <li>1. Choose one drink category that matches your ingredient supply.</li>
          <li>2. Reserve grain, fruit, honey, hops, yeast, or other required groups before service.</li>
          <li>3. Use the correct brewing or fermentation station and avoid overloading one station queue.</li>
          <li>4. Decide whether aging is worth the time for your current tavern plan.</li>
          <li>5. Review what sold and adjust the next production batch.</li>
        </ol>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-amber-50">Drink Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm text-stone-200">
              {category}
            </span>
          ))}
        </div>
        <Link href="/drinks" className="mt-4 inline-flex text-sm font-bold text-amber-200 hover:text-amber-100">
          Browse all drinks
        </Link>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-amber-50">Related Drinks</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedDrinks.map((drink) => (
            <ContentCard key={drink.href} item={drink} />
          ))}
        </div>
      </section>
    </main>
  );
}
