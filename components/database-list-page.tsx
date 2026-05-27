import { Breadcrumbs } from "@/components/breadcrumbs";
import { DatabaseList, type DatabaseListItem } from "@/components/database-list";
import type { Category } from "@/types/content";

export function DatabaseListPage({ category, items }: { category: Category; items: DatabaseListItem[] }) {
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
      <DatabaseList items={items} />
    </main>
  );
}
