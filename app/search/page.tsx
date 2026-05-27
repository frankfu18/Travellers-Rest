import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPageClient } from "@/components/search-page-client";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Search - Travellers Rest Guide Database",
  description: "Search Travellers Rest guides, recipes, drinks, ingredients, crops, fish, crafting stations, and tools.",
  path: "/search",
  keywords: ["Travellers Rest search", "Travellers Rest database", "Travellers Rest guide search"],
});

export default function SearchPage() {
  return (
    <main>
      <Suspense fallback={<SearchFallback />}>
        <SearchPageClient />
      </Suspense>
    </main>
  );
}

function SearchFallback() {
  return (
    <section className="border-b border-amber-300/15 bg-[#1a100b]">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Travellers Rest database</p>
        <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">Search Travellers Rest Guide Database</h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-300">Loading search...</p>
      </div>
    </section>
  );
}
