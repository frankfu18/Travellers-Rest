"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const stages = ["Early", "Mid", "Late"] as const;
const goals = ["Stable income", "Reputation", "Use surplus ingredients", "Prepare for trends", "Easy beginner menu"] as const;
const categories = ["Vegetables", "Meat", "Fish", "Fruit", "Grains", "Drinks"] as const;
const stations = ["Food Prep Table", "Oven", "Fermentation Tank", "Keg", "Aging Shelf", "Other"] as const;

type Stage = (typeof stages)[number];
type Goal = (typeof goals)[number];
type Category = (typeof categories)[number];
type Station = (typeof stations)[number];

const goalAdvice: Record<
  Goal,
  {
    food: string[];
    drinks: string[];
    stockpile: string[];
    watch: string[];
    variety: string[];
    mistakes: string[];
    recipes: Array<{ title: string; href: string }>;
  }
> = {
  "Stable income": {
    food: [
      "Use one or two repeatable food lines that match your strongest ingredient source.",
      "Prefer flexible recipes that accept broad ingredient groups when exact supply changes day to day.",
    ],
    drinks: [
      "Keep one baseline drink ready before adding specialty drinks.",
      "Brew early enough that finished drinks reach service before customers arrive.",
    ],
    stockpile: ["Core vegetables", "Grain or flour inputs", "A small seasoning buffer", "Baseline drink ingredients"],
    watch: ["Ingredients shared by cooking and brewing", "Items that sell out before the rest of the menu", "Stations that stay busy during prep"],
    variety: [
      "Add variety after the core menu survives normal service.",
      "Use one rotating slot for surplus instead of changing the whole menu.",
    ],
    mistakes: [
      "Adding more dishes when the reliable dish already runs out.",
      "Using all brewing inputs in food before checking drink stock.",
    ],
    recipes: [
      { title: "Vegetable Stew", href: "/recipes/vegetable-stew" },
      { title: "Roast Fish", href: "/recipes/roast-fish" },
      { title: "Light Beer", href: "/drinks/light-beer" },
    ],
  },
  Reputation: {
    food: [
      "Choose food you can keep available consistently so service quality stays predictable.",
      "Use variety as support for customer satisfaction only when stock does not become chaotic.",
    ],
    drinks: [
      "Keep drink service balanced with the food menu; an empty bar makes a good kitchen feel weaker.",
      "Use aging or specialty drinks only after baseline drinks are protected.",
    ],
    stockpile: ["Prepared food for normal service", "Drink inputs", "Cleaning and service support materials", "Flexible vegetables or fish"],
    watch: ["Customer wait pressure", "Shortages that appear during busy hours", "Menu items that create too much prep time"],
    variety: [
      "Keep at least one dependable food and drink while testing a new reputation-focused option.",
      "Rotate by category rather than replacing every product at once.",
    ],
    mistakes: [
      "Trying to improve reputation with expansion while the menu is still unreliable.",
      "Opening before stock and cleaning are ready.",
    ],
    recipes: [
      { title: "Garden Salad", href: "/recipes/garden-salad" },
      { title: "Grilled Vegetables", href: "/recipes/grilled-vegetables" },
      { title: "Drinks Database", href: "/drinks" },
    ],
  },
  "Use surplus ingredients": {
    food: [
      "Turn surplus into optional menu slots, not core dependencies.",
      "Match surplus to broad recipe families: vegetables to soups or grilled dishes, fruit to desserts, fish to fish meals.",
    ],
    drinks: [
      "Use fruit or grain surplus for drink experiments only after baseline drink stock is safe.",
      "Avoid splitting small surplus piles across too many drink chains.",
    ],
    stockpile: ["Ingredients that support the core menu", "A small overflow group for experiments", "Processing inputs such as flour or yeast when available"],
    watch: ["Surplus that never sells", "Core ingredients accidentally treated as surplus", "Station queues caused by experiments"],
    variety: [
      "Run one surplus dish at a time and watch whether it actually helps service.",
      "Keep surplus recipes outside the emergency stock plan.",
    ],
    mistakes: [
      "Using surplus logic on ingredients that the core menu still needs.",
      "Letting experiments consume prep time right before opening.",
    ],
    recipes: [
      { title: "Grilled Vegetables", href: "/recipes/grilled-vegetables" },
      { title: "Fruit Tart", href: "/recipes/fruit-tart" },
      { title: "Fish Pie", href: "/recipes/fish-pie" },
    ],
  },
  "Prepare for trends": {
    food: [
      "Keep flexible ingredient groups ready so you can pivot without rebuilding the whole menu.",
      "Prepare category coverage rather than exact unverified values.",
    ],
    drinks: [
      "Reserve baseline drink inputs, then keep a separate trend buffer for fruit, grain, honey, or hops-style needs.",
      "Avoid aging every batch if you need flexible response stock.",
    ],
    stockpile: ["Vegetable group", "Fruit group", "Grain group", "Fish or meat backup", "Drink input buffer"],
    watch: ["Trend categories that compete with core menu inputs", "Ingredients used by both food and drinks", "Prepared stock that cannot pivot"],
    variety: [
      "Use the trend item as a focused addition while the core menu stays intact.",
      "Build category coverage slowly so storage remains readable.",
    ],
    mistakes: [
      "Preparing only one exact item and ignoring the ingredient group behind the trend.",
      "Draining the everyday menu to chase a trend.",
    ],
    recipes: [
      { title: "How to Prepare for Trends", href: "/guides/how-to-prepare-for-trends" },
      { title: "Ingredients", href: "/ingredients" },
      { title: "Recipes", href: "/recipes" },
    ],
  },
  "Easy beginner menu": {
    food: [
      "Pick simple food that uses ingredients you already understand and can replace.",
      "Keep the menu short enough that you can refill it before opening.",
    ],
    drinks: [
      "Use one basic drink plan instead of learning every drink chain at once.",
      "Only add brewing complexity after food and cleaning feel stable.",
    ],
    stockpile: ["A flexible vegetable", "Water or basic soup inputs", "Any fish if you fish regularly", "One drink input set"],
    watch: ["Ingredients with many competing uses", "Recipes that require stations you do not use smoothly yet", "Menu items you cannot restock tomorrow"],
    variety: [
      "Start with one food, one drink, and one backup option.",
      "Add a second food category only after the first is easy to restock.",
    ],
    mistakes: [
      "Unlocking a new recipe and immediately making it the main menu.",
      "Serving too many categories before you know which ingredients run out.",
    ],
    recipes: [
      { title: "Vegetable Stew", href: "/recipes/vegetable-stew" },
      { title: "Roast Fish", href: "/recipes/roast-fish" },
      { title: "Beginner Mistakes", href: "/guides/beginner-mistakes" },
    ],
  },
};

const stageNotes: Record<Stage, string[]> = {
  Early: [
    "Keep the menu narrow and repeatable.",
    "Use exact in-game values only after you know the ingredients are replaceable.",
  ],
  Mid: [
    "Split storage into core, surplus, brewing, and trend buffers.",
    "Add variety by category coverage instead of random recipes.",
  ],
  Late: [
    "Optimize around scheduled production, staff coverage, and trend-ready reserves.",
    "Remove products that consume important inputs without supporting the tavern goal.",
  ],
};

const categoryNotes: Record<Category, string> = {
  Vegetables: "Vegetables are strong for flexible soups, salads, and simple cooked food when farming is reliable.",
  Meat: "Meat works best as a planned hearty menu line, not as a fallback if the source is inconsistent.",
  Fish: "Fish is useful when fishing is already part of your daily routine and catches can become prepared food.",
  Fruit: "Fruit can support desserts and drinks, but protect it if trends or brewing need it soon.",
  Grains: "Grains often compete between baking and brewing, so reserve them before production starts.",
  Drinks: "Drinks should have a baseline chain before specialty or aged batches consume flexible inputs.",
};

const stationNotes: Record<Station, string> = {
  "Food Prep Table": "Cold and prep-table foods are useful when they do not steal time from hot food bottlenecks.",
  Oven: "Oven recipes are better once flour, fruit, grain, or baking inputs are stable.",
  "Fermentation Tank": "Fermentation is a planning system: prepare inputs before service and avoid too many drink experiments at once.",
  Keg: "Keg flow matters because finished drinks only help when they are ready for service.",
  "Aging Shelf": "Age only the stock you can afford to lock away; keep flexible drinks for normal service.",
  Other: "Use other stations only when they solve a named bottleneck in the current menu plan.",
};

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function MenuPlannerClient() {
  const [stage, setStage] = useState<Stage>("Early");
  const [goal, setGoal] = useState<Goal>("Stable income");
  const [availableCategories, setAvailableCategories] = useState<Category[]>(["Vegetables", "Grains", "Drinks"]);
  const [unlockedStations, setUnlockedStations] = useState<Station[]>(["Food Prep Table", "Keg"]);

  const plan = useMemo(() => {
    const base = goalAdvice[goal];
    return {
      food: unique([...base.food, ...stageNotes[stage], ...availableCategories.map((item) => categoryNotes[item])]).slice(0, 8),
      drinks: unique([...base.drinks, ...unlockedStations.map((item) => stationNotes[item])]).slice(0, 7),
      stockpile: base.stockpile,
      watch: base.watch,
      variety: base.variety,
      mistakes: base.mistakes,
      recipes: base.recipes,
    };
  }, [availableCategories, goal, stage, unlockedStations]);

  function toggleCategory(category: Category) {
    setAvailableCategories((current) => (current.includes(category) ? current.filter((item) => item !== category) : [...current, category]));
  }

  function toggleStation(station: Station) {
    setUnlockedStations((current) => (current.includes(station) ? current.filter((item) => item !== station) : [...current, station]));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <section className="wood-panel rounded-lg p-5 lg:sticky lg:top-24 lg:self-start" aria-label="Menu planner inputs">
        <label className="block">
          <span className="text-sm font-bold text-amber-100">Game stage</span>
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value as Stage)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {stages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-amber-100">Goal</span>
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value as Goal)}
            className="mt-2 min-h-11 w-full rounded border border-amber-200/25 bg-[#120c08] px-3 text-stone-100 outline-none focus:border-amber-200/60"
          >
            {goals.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <Checklist title="Available categories" items={categories} selected={availableCategories} onToggle={toggleCategory} />
        <Checklist title="Unlocked stations" items={stations} selected={unlockedStations} onToggle={toggleStation} />
      </section>

      <section className="space-y-5" aria-live="polite">
        <OutputPanel title="Recommended Food Types" label="Food focus" items={plan.food} />
        <OutputPanel title="Recommended Drink Strategy" label="Drink plan" items={plan.drinks} />
        <div className="grid gap-5 xl:grid-cols-2">
          <OutputPanel title="Ingredients to Stockpile" label="Stockpile" items={plan.stockpile} />
          <OutputPanel title="Flexible Ingredient Groups to Watch" label="Watch list" items={plan.watch} />
          <OutputPanel title="Menu Variety Tips" label="Variety" items={plan.variety} />
          <OutputPanel title="Common Mistakes" label="Avoid" items={plan.mistakes} warning />
        </div>
        <section className="wood-panel rounded-lg p-5">
          <h2 className="text-2xl font-bold text-amber-50">Related Recipes and Planning Pages</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {plan.recipes.map((item) => (
              <Link key={item.href} href={item.href} className="rounded border border-amber-200/15 bg-[#120c08]/70 px-4 py-3 font-bold text-amber-100 hover:border-amber-200/40">
                {item.title}
              </Link>
            ))}
            <Link href="/ingredients" className="rounded border border-amber-200/15 bg-[#120c08]/70 px-4 py-3 font-bold text-amber-100 hover:border-amber-200/40">
              Ingredients Database
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}

function Checklist<T extends string>({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: readonly T[];
  selected: T[];
  onToggle: (item: T) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-bold text-amber-100">{title}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 rounded border border-amber-200/15 bg-[#120c08]/75 px-3 py-2 text-sm text-stone-200">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => onToggle(item)} className="h-4 w-4 accent-[#f3c35a]" />
            {item}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function OutputPanel({ title, label, items, warning = false }: { title: string; label: string; items: string[]; warning?: boolean }) {
  return (
    <section className={`rounded-lg border p-5 ${warning ? "border-[#be6a50]/55 bg-[#2b120d]" : "border-amber-200/18 bg-[#1a100b]"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded bg-amber-300 px-2 py-1 text-xs font-black uppercase tracking-[0.12em] text-stone-950">{label}</span>
        <h2 className="text-2xl font-bold text-amber-50">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3 text-stone-300">
        {items.map((item) => (
          <li key={item} className="rounded border border-amber-200/12 bg-[#120c08]/65 p-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
