"use client";

import { useMemo, useState } from "react";

export function ProfitCalculator() {
  const [itemName, setItemName] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [ingredientCost, setIngredientCost] = useState("");

  const result = useMemo(() => {
    const sell = Number(sellPrice);
    const cost = Number(ingredientCost);

    if (!Number.isFinite(sell) || !Number.isFinite(cost) || sellPrice.trim() === "" || ingredientCost.trim() === "") {
      return null;
    }

    const profit = sell - cost;
    const margin = sell > 0 ? (profit / sell) * 100 : 0;
    return { profit, margin };
  }, [ingredientCost, sellPrice]);

  return (
    <div className="wood-panel rounded-lg p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className="text-sm font-bold text-amber-100">Item name</span>
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            placeholder="Apple Pie"
            className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          />
        </label>
        <label>
          <span className="text-sm font-bold text-amber-100">Sell price</span>
          <input
            value={sellPrice}
            onChange={(event) => setSellPrice(event.target.value)}
            inputMode="decimal"
            placeholder="0"
            className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          />
        </label>
        <label>
          <span className="text-sm font-bold text-amber-100">Ingredient cost</span>
          <input
            value={ingredientCost}
            onChange={(event) => setIngredientCost(event.target.value)}
            inputMode="decimal"
            placeholder="0"
            className="mt-1 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          />
        </label>
      </div>
      <div className="mt-5 rounded border border-amber-200/15 bg-[#120c08] p-4">
        {result ? (
          <div>
            <p className="text-lg font-bold text-amber-50">{itemName.trim() || "Item"} profit estimate</p>
            <p className="mt-2 text-stone-300">Profit: {result.profit.toFixed(2)}</p>
            <p className="text-stone-300">Profit margin: {result.margin.toFixed(1)}%</p>
            <p className="mt-3 text-sm text-stone-400">
              This calculator uses your manual inputs only. Use verified in-game values when comparing routes.
            </p>
          </div>
        ) : (
          <p className="text-stone-300">Enter a sell price and ingredient cost to calculate profit and margin.</p>
        )}
      </div>
    </div>
  );
}
