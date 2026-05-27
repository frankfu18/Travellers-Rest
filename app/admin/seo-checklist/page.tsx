import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { searchIndex, type SearchItemType } from "@/lib/search";

export const metadata: Metadata = createMetadata({
  title: "SEO Checklist - Travellers Rest Guide",
  description: "Internal SEO checklist for Travellers Rest Guide content coverage and search index size.",
  path: "/admin/seo-checklist",
});

const types: SearchItemType[] = ["guide", "recipe", "drink", "ingredient", "crop", "fish", "station", "tool"];

export default function SeoChecklistPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Admin</p>
      <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">SEO Checklist</h1>
      <section className="mt-8 wood-panel rounded-lg p-5">
        <h2 className="text-2xl font-bold text-amber-50">Search Index</h2>
        <p className="mt-2 text-stone-300">Total indexed items: {searchIndex.length}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((type) => (
            <div key={type} className="rounded border border-amber-200/15 bg-[#120c08] p-4">
              <dt className="font-bold capitalize text-amber-100">{type}</dt>
              <dd className="text-2xl font-black text-amber-50">{searchIndex.filter((item) => item.type === type).length}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
