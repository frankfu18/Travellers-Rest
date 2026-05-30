import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { DataStatusBlock } from "@/components/data-status-block";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { formatDataStatus, getRelatedGuides, getRelatedItems } from "@/lib/content";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import type { CardItem, DatabaseEntry } from "@/types/content";

type DatabaseDetailPageProps = {
  entry: DatabaseEntry;
  sectionName: string;
  sectionHref: string;
};

export function DatabaseDetailPage({ entry, sectionName, sectionHref }: DatabaseDetailPageProps) {
  const path = `${sectionHref}/${entry.slug}`;
  const relatedItems = getRelatedItems(entry);
  const relatedGuides = getRelatedGuides(path);
  const isPublicSitemapEntry = entry.dataStatus === "verified" || entry.dataStatus === "completed";
  const toc = [
    { id: "quick-facts", title: "Quick Facts" },
    { id: "strategy-use", title: "Strategy Use" },
    { id: "how-to-get", title: getHowToTitle(entry) },
    { id: "used-in", title: getUsedInTitle(entry) },
    { id: "how-to-use", title: "How to Use This Item" },
    { id: "tips", title: "Tips" },
    { id: "faq-heading", title: "FAQ" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <JsonLd
        data={[
          articleSchema({
            title: entry.title,
            description: entry.description,
            path,
            dateModified: entry.lastChecked,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: sectionName, path: sectionHref },
            { name: entry.name, path },
          ]),
          faqSchema(entry.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: sectionName, href: sectionHref },
          { name: entry.name, href: path },
        ]}
      />
      <article className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">{entry.category}</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{entry.name} - Travellers Rest Guide</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{entry.description}</p>
          {!isPublicSitemapEntry ? (
            <div className="mt-5 rounded border border-amber-200/20 bg-amber-200/10 p-4 text-sm text-amber-50">
              This entry is still being checked and is not included in the public sitemap yet.
            </div>
          ) : null}

          <section id="strategy-use" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Strategy Use</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {getStrategyRows(entry).map((row) => (
                <div key={row.label} className="rounded border border-amber-200/15 bg-[#120c08]/70 p-4">
                  <h3 className="font-bold text-amber-100">{row.label}</h3>
                  <p className="mt-2 text-sm text-stone-300">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded border border-amber-200/15 bg-[#1a100b] p-4">
              <h3 className="font-bold text-amber-50">Related Planner Suggestions</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {getPlannerLinks(entry).map((item) => (
                  <Link key={item.href} href={item.href} className="rounded border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-sm font-bold text-amber-100 hover:border-amber-200/50">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="how-to-get" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">{getHowToTitle(entry)}</h2>
            <div className="mt-3 space-y-4 text-stone-300">
              {getHowToParagraphs(entry).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section id="used-in" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">{getUsedInTitle(entry)}</h2>
            <div className="mt-3 space-y-4 text-stone-300">
              {getUsedInParagraphs(entry).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {relatedItems.length > 0 ? <CardGrid items={relatedItems} /> : null}
          </section>

          <section id="how-to-use" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">How to Use This Item</h2>
            <div className="mt-3 space-y-4 text-stone-300">
              {getHowToUseParagraphs(entry).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {entry.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10">
              <h2 className="text-2xl font-bold text-amber-50">{section.title}</h2>
              <div className="mt-3 space-y-4 text-stone-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section id="tips" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Tips</h2>
            <ul className="mt-3 space-y-2 text-stone-300">
              {entry.tips.map((tip) => (
                <li key={tip} className="rounded border border-amber-200/15 bg-[#1a100b] px-4 py-3">
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <Faq items={entry.faq} />
          </div>

          <section className="mt-10" aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading" className="text-2xl font-bold text-amber-50">
              Related Guides
            </h2>
            <CardGrid items={relatedGuides} />
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={toc} />
          <InfoTable rows={getQuickFacts(entry)} />
          <DataStatusBlock entry={entry} />
        </aside>
      </article>
    </main>
  );
}

function CardGrid({ items }: { items: CardItem[] }) {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <ContentCard key={item.href} item={item} />
      ))}
    </div>
  );
}

function getQuickFacts(entry: DatabaseEntry): Array<{ label: string; value: React.ReactNode }> {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Category", value: entry.category },
    { label: "Data Status", value: formatDataStatus(entry.dataStatus) },
  ];

  if (entry.kind === "recipe") {
    rows.push(
      { label: "Sell Value", value: entry.sellValue },
      { label: "Ingredient Groups", value: entry.ingredientGroups.join(", ") },
      { label: "Station", value: <Link href={`/crafting/${entry.stationSlug}`}>{entry.station}</Link> },
      { label: "Unlock Level", value: entry.unlockLevel },
    );
  }

  if (entry.kind === "drink") {
    rows.push(
      { label: "Sell Value", value: entry.sellValue },
      { label: "Ingredient Groups", value: entry.ingredientGroups.join(", ") },
      { label: "Station", value: <Link href={`/crafting/${entry.stationSlug}`}>{entry.station}</Link> },
      { label: "Aging", value: entry.aging },
    );
  }

  if (entry.kind === "ingredient") {
    rows.push({ label: "Source", value: entry.source }, { label: "Sell Value", value: entry.sellValue });
  }

  if (entry.kind === "crop") {
    rows.push(
      { label: "Seed", value: entry.seed },
      { label: "Season", value: entry.season },
      { label: "Harvest", value: entry.harvest },
      { label: "Grows Into", value: <Link href={`/ingredients/${entry.growsIntoSlug}`}>{entry.growsInto}</Link> },
    );
  }

  if (entry.kind === "fish") {
    rows.push({ label: "Location", value: entry.location }, { label: "Bait", value: entry.bait });
  }

  if (entry.kind === "station") {
    rows.push({ label: "Station Type", value: entry.stationType }, { label: "Unlock Level", value: entry.unlockLevel });
  }

  return rows;
}

function getStrategyRows(entry: DatabaseEntry): Array<{ label: string; value: string }> {
  return [
    { label: "Best used for", value: getBestUsedFor(entry) },
    { label: "Good for beginners?", value: getBeginnerFit(entry) },
    { label: "Stockpile priority", value: getStockpilePriority(entry) },
    { label: "Works well with", value: getWorksWellWith(entry) },
    { label: "Avoid using when", value: getAvoidUsingWhen(entry) },
  ];
}

function getBestUsedFor(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return `${entry.name} works best when its ingredient groups are already part of your active food plan and the ${entry.station} is not your current bottleneck.`;
  if (entry.kind === "drink") return `${entry.name} works best as part of a planned drink chain with protected inputs and service-ready storage.`;
  if (entry.kind === "ingredient") return `${entry.name} is best used when you assign it to a clear role: core food, drink input, reserve, trend buffer, or experiment stock.`;
  if (entry.kind === "crop") return `${entry.name} is best used when ${entry.growsInto} supports the recipes, drinks, or reserves you actually plan to serve.`;
  if (entry.kind === "fish") return `${entry.name} is best used when fishing is already part of the day and the catch can become prepared food instead of idle storage.`;
  return `${entry.name} is best used when it removes a named production, service, storage, or menu bottleneck.`;
}

function getBeginnerFit(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return entry.ingredientGroups.length <= 2 ? "Usually beginner-friendly if the ingredients are easy to replace." : "Better after your ingredient supply and station flow are stable.";
  if (entry.kind === "drink") return "Beginner-friendly only when it can be your reliable baseline drink or a simple second drink.";
  if (entry.kind === "ingredient") return entry.sourceType === "crop" || entry.sourceType === "fish" ? "Good for beginners when the source is already part of your daily routine." : "Use carefully until the source and competing uses are verified in game.";
  if (entry.kind === "crop") return "Good for beginners when the harvest feeds your current menu instead of random storage.";
  if (entry.kind === "fish") return "Good for beginners if you fish consistently and keep a non-fish backup food.";
  return "Good for beginners when the station solves a problem you already have, not when it adds a new chain too early.";
}

function getStockpilePriority(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return "Stockpile its ingredient groups only if this recipe is part of the core menu.";
  if (entry.kind === "drink") return "Protect its drink inputs before cooking experiments, especially if it is your baseline tap option.";
  if (entry.kind === "ingredient") return entry.dataStatus === "needs_verification" ? "Needs verification; prioritize by your observed shortages before using strict counts." : "Prioritize if it supports multiple active food or drink chains.";
  if (entry.kind === "crop") return "Stockpile the harvest when it supports core recipes, drink inputs, or a trend buffer.";
  if (entry.kind === "fish") return "Stockpile lightly unless catches are consistent; prepared food is usually easier to evaluate than idle fish.";
  return "Stockpile supporting materials only when the station is part of your next production upgrade.";
}

function getWorksWellWith(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return `${entry.ingredientGroups.join(", ")} planning, the ${entry.station}, and the Menu Planner.`;
  if (entry.kind === "drink") return `${entry.ingredientGroups.join(", ")} reserves, keg flow, brewing planning, and the Menu Planner.`;
  if (entry.kind === "ingredient") return "Recipes, drinks, crops, or fish routes that use the same ingredient group without draining the core menu.";
  if (entry.kind === "crop") return `${entry.growsInto}, recipe planning, stockpile planning, and trend preparation.`;
  if (entry.kind === "fish") return "Fish-based recipes, flexible food planning, and days where fishing does not steal tavern prep time.";
  return `${entry.usedFor.join(", ")}, progression planning, and bottleneck-focused upgrades.`;
}

function getAvoidUsingWhen(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return "Avoid making it a core menu item when its inputs are rare, shared with brewing, or not replaceable tomorrow.";
  if (entry.kind === "drink") return "Avoid relying on it when its inputs are thin or when station timing means it will not be ready before service.";
  if (entry.kind === "ingredient") return "Avoid spending it casually when another core recipe, drink, or trend buffer depends on the same stock.";
  if (entry.kind === "crop") return "Avoid planting around it when you cannot name the food, drink, or reserve role for the harvest.";
  if (entry.kind === "fish") return "Avoid building the whole menu around it when catches are inconsistent or the tavern still needs prep time.";
  return "Avoid prioritizing it when it creates a new production chain before ingredients, storage, and service flow are ready.";
}

function getPlannerLinks(entry: DatabaseEntry): Array<{ title: string; href: string }> {
  const links = [
    { title: "Menu Planner", href: "/menu-planner" },
    { title: "What to Do Next", href: "/what-to-do-next" },
  ];

  if (entry.kind === "recipe" || entry.kind === "ingredient" || entry.kind === "crop" || entry.kind === "fish") {
    links.push({ title: "Best Early Recipes", href: "/guides/best-early-game-recipes" });
  }

  if (entry.kind === "drink" || (entry.kind === "ingredient" && ["Brewing", "Grain", "Fruit", "Sweetener", "Processing"].includes(entry.category))) {
    links.push({ title: "Best Drinks on Tap", href: "/guides/best-drinks-to-keep-on-tap" });
  }

  links.push({ title: "Inventory Management", href: "/guides/tavern-inventory-management" });
  return links.slice(0, 4);
}

function getHowToTitle(entry: DatabaseEntry): string {
  if (entry.kind === "recipe" || entry.kind === "drink") return "How to Make";
  if (entry.kind === "ingredient" || entry.kind === "fish") return "How to Get";
  if (entry.kind === "crop") return "How to Grow";
  return "How to Use";
}

function getUsedInTitle(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return "Ingredients and Related Items";
  if (entry.kind === "drink") return "Ingredient Groups and Brewing Links";
  if (entry.kind === "crop") return "Grows Into and Recipe Uses";
  if (entry.kind === "fish") return "Used in Recipes";
  if (entry.kind === "station") return "Used For";
  return "Used in Recipes and Drinks";
}

function getHowToParagraphs(entry: DatabaseEntry): string[] {
  if (entry.kind === "recipe") {
    return [`Make ${entry.name} at the ${entry.station}. The ingredient groups are ${entry.ingredientGroups.join(", ")}. Check in game for unlock level, timing, and current value before using it in a strict profit route.`];
  }
  if (entry.kind === "drink") {
    return [`Brew ${entry.name} through the ${entry.station} using ${entry.ingredientGroups.join(", ")}. Plan the drink around ingredient reserves and station availability before adding it to your main menu.`];
  }
  if (entry.kind === "ingredient") {
    return [`Get ${entry.name} from: ${entry.source}. Because this entry needs verification, confirm the exact source and unlock timing in the current game version.`];
  }
  if (entry.kind === "crop") {
    return [`Grow ${entry.name} from ${entry.seed}. Season and harvest timing should be checked in game before planning a farming route.`];
  }
  if (entry.kind === "fish") {
    return [`Catch ${entry.name} through fishing. Location: ${entry.location}. Bait details should be checked in game before planning a route.`];
  }
  return [`Use ${entry.name} when it supports your current production bottleneck. Check in game for unlock and build requirements.`];
}

function getUsedInParagraphs(entry: DatabaseEntry): string[] {
  if (entry.kind === "recipe") return [`${entry.name} is mainly useful when its ingredients are easy to replace and its station is not blocking higher-priority production.`];
  if (entry.kind === "drink") return [`${entry.name} links to the brewing guide and drink database because ingredient groups and aging decisions affect tavern value.`];
  if (entry.kind === "crop") return [`${entry.name} grows into ${entry.growsInto}, which can connect to recipes, drinks, or ingredient planning.`];
  if (entry.kind === "fish") return [`${entry.name} can be used in fish-based recipes such as Roast Fish or Fish Pie when the recipe accepts fish.`];
  if (entry.kind === "station") return [`${entry.name} supports ${entry.usedFor.join(", ").toLowerCase()}. Choose it when those outputs solve your current bottleneck.`];
  return [`${entry.name} can appear in recipes, drinks, or production chains depending on its category and source.`];
}

function getHowToUseParagraphs(entry: DatabaseEntry): string[] {
  if (entry.kind === "recipe") {
    return [
      `Use ${entry.name} as part of a food menu only when its ingredient groups are easy for your tavern to replace. Check whether the ${entry.station} is already busy before making it a core item.`,
      "For profit planning, compare the full chain: ingredient source, station time, service demand, and what else the same inputs could become.",
    ];
  }
  if (entry.kind === "drink") {
    return [
      `Use ${entry.name} when its ingredient groups fit your brewing routine and the ${entry.station} is not blocking a more reliable drink chain.`,
      "Drinks work best when they are ready before service, so plan brewing around reserves, station timing, and the current customer flow.",
    ];
  }
  if (entry.kind === "ingredient") {
    return [
      `Use ${entry.name} by assigning it to a clear food, drink, reserve, or production role before service starts.`,
      "If the ingredient supports several products, protect the product that keeps your current tavern loop most stable.",
    ];
  }
  if (entry.kind === "crop") {
    return [
      `Use ${entry.name} as part of a farming plan when ${entry.growsInto} supports your active recipes, drinks, or reserves.`,
      "Crops are strongest when the harvest has a destination before planting; avoid growing wide variety that does not feed the menu.",
    ];
  }
  if (entry.kind === "fish") {
    return [
      `Use ${entry.name} when fishing fits the day and the catch can become food stock instead of sitting unused in storage.`,
      "Fish works best as menu support when you can catch it consistently enough to supply the recipes you plan to serve.",
    ];
  }
  return [
    `Use ${entry.name} when it removes a repeated production bottleneck in your tavern routine.`,
    "A station is strongest when ingredients, storage, and service demand are ready for the new chain it enables.",
  ];
}
