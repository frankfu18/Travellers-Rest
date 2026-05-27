import type { FaqItem } from "@/types/content";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-amber-50">
        FAQ
      </h2>
      <div className="mt-4 divide-y divide-amber-200/15 rounded-lg border border-amber-200/15 bg-[#1a100b]">
        {items.map((item) => (
          <details key={item.question} className="group p-5">
            <summary className="cursor-pointer font-bold text-amber-100">{item.question}</summary>
            <p className="mt-3 text-stone-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
