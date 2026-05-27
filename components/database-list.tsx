"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DataStatus } from "@/types/content";

export type DatabaseListItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  dataStatus: DataStatus;
  href: string;
};

const statusLabels: Record<DataStatus, string> = {
  verified: "Verified",
  completed: "Completed",
  needs_verification: "Needs verification",
  estimated: "Estimated",
};

export function DatabaseList({ items }: { items: DatabaseListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"name" | "category" | "dataStatus">("name");

  const categories = useMemo(() => ["all", ...Array.from(new Set(items.map((item) => item.category))).sort()], [items]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery) ||
          item.category.toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === "all" || item.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => a[sort].localeCompare(b[sort]));
  }, [category, items, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="wood-panel rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
          <label className="block">
            <span className="text-sm font-bold text-amber-100">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, category, or use..."
              className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-amber-100">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All categories" : item}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-amber-100">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as "name" | "category" | "dataStatus")}
              className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="dataStatus">Data status</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article key={item.href} className="wood-panel rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-amber-200/35">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f3c35a]">
              {item.category} - {statusLabels[item.dataStatus]}
            </p>
            <h2 className="mt-2 text-xl font-bold text-amber-50">
              <Link href={item.href}>{item.name}</Link>
            </h2>
            <p className="mt-2 text-sm text-stone-300">{item.description}</p>
            <Link href={item.href} className="mt-4 inline-flex text-sm font-bold text-amber-200 hover:text-amber-100">
              View details
            </Link>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-8 rounded border border-amber-200/20 bg-[#1a100b] p-6 text-center text-stone-300">
          No matching entries found. Try a broader search or another category.
        </div>
      ) : null}
    </section>
  );
}
