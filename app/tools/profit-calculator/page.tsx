import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProfitCalculator } from "@/components/profit-calculator";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Travellers Rest Profit Calculator",
  description: "Calculate item profit and profit margin for Travellers Rest using manual sell price and ingredient cost inputs.",
  path: "/tools/profit-calculator",
  keywords: ["Travellers Rest profit calculator", "Travellers Rest profit", "Travellers Rest money"],
});

export default function ProfitCalculatorPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ name: "Tools", href: "/tools" }, { name: "Profit Calculator", href: "/tools/profit-calculator" }]} />
      <h1 className="mt-8 text-4xl font-black text-amber-50 lg:text-5xl">Travellers Rest Profit Calculator</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-300">
        Enter an item name, sell price, and ingredient cost to estimate profit. Use current in-game values for reliable planning.
      </p>
      <div className="mt-8">
        <ProfitCalculator />
      </div>
    </main>
  );
}
