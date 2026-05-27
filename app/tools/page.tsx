import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Tools",
  description: "Profit, brewing, and aging planning tools for Travellers Rest.",
  path: "/tools",
  keywords: ["Travellers Rest tools", "profit calculator", "brewing guide"],
});

const tools = [
  { title: "Profit Calculator", href: "/tools/profit-calculator", description: "Estimate profit and profit margin from manual price and cost inputs." },
  { title: "Brewing Guide", href: "/tools/brewing-guide", description: "Plan brewing steps, drink categories, and related drink pages." },
  { title: "Aging Guide", href: "/tools/aging-guide", description: "Understand how aging can affect food and drink planning." },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }]} />
      <h1 className="mt-8 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Tools</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-300">Use these lightweight planning tools alongside the database pages.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="wood-panel rounded-lg p-5 hover:border-amber-200/35">
            <h2 className="text-xl font-bold text-amber-50">{tool.title}</h2>
            <p className="mt-2 text-sm text-stone-300">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
