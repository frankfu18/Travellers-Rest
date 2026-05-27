import { ContentCard } from "@/components/content-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { CardItem, Category } from "@/types/content";

export function CategoryPage({ category, items }: { category: Category; items: CardItem[] }) {
  return (
    <main>
      <section className="border-b border-amber-300/15 bg-[#1a100b]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <Breadcrumbs items={[{ name: category.name, href: category.href }]} />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">Travellers Rest database</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-5 flex flex-col gap-3 border-b border-amber-200/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-50">Pages</h2>
            <p className="text-sm text-stone-400">Static card list now, pagination-ready structure later.</p>
          </div>
          <nav aria-label={`${category.name} pagination`} className="flex items-center gap-2 text-sm">
            <span className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-amber-100">Page 1</span>
            <span className="text-stone-500">of 1</span>
          </nav>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ContentCard key={item.href} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
