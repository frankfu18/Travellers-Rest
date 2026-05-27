import Link from "next/link";
import type { CardItem } from "@/types/content";

export function ContentCard({ item }: { item: CardItem }) {
  return (
    <article className="wood-panel rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-amber-200/35">
      {item.meta ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f3c35a]">{item.meta}</p> : null}
      <h3 className="mt-2 text-xl font-bold text-amber-50">
        <Link href={item.href}>{item.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-stone-300">{item.description}</p>
      <Link href={item.href} className="mt-4 inline-flex text-sm font-bold text-amber-200 hover:text-amber-100">
        View page
      </Link>
    </article>
  );
}
