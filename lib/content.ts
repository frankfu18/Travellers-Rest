import { categories } from "@/data/categories";
import { craftingStations } from "@/data/crafting-stations";
import { crops } from "@/data/crops";
import { drinks } from "@/data/drinks";
import { fish } from "@/data/fish";
import { guides } from "@/data/guides";
import { ingredients } from "@/data/ingredients";
import { recipes } from "@/data/recipes";
import type { CardItem, Category, CraftingStation, Crop, DatabaseEntry, Drink, Fish, Guide, Ingredient, Recipe } from "@/types/content";

export function getCategory(slug: string): Category {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`Unknown category: ${slug}`);
  }

  return category;
}

export function guideToCard(guide: Guide): CardItem {
  return {
    title: guide.title,
    href: `/guides/${guide.slug}`,
    description: guide.description,
    meta: guide.category,
  };
}

export function entryToCard(entry: DatabaseEntry): CardItem {
  return {
    title: entry.name,
    href: getEntryPath(entry),
    description: entry.description,
    meta: `${entry.category} - ${formatDataStatus(entry.dataStatus)}`,
  };
}

export function getEntryPath(entry: DatabaseEntry): string {
  if (entry.kind === "recipe") return `/recipes/${entry.slug}`;
  if (entry.kind === "drink") return `/drinks/${entry.slug}`;
  if (entry.kind === "ingredient") return `/ingredients/${entry.slug}`;
  if (entry.kind === "crop") return `/crops/${entry.slug}`;
  if (entry.kind === "fish") return `/fish/${entry.slug}`;
  return `/crafting/${entry.slug}`;
}

export function formatDataStatus(status: DatabaseEntry["dataStatus"]): string {
  const labels: Record<DatabaseEntry["dataStatus"], string> = {
    verified: "Verified",
    completed: "Completed",
    needs_verification: "Needs verification",
    estimated: "Estimated",
  };

  return labels[status];
}

export function getCardsForCategory(slug: string): CardItem[] {
  const maps: Record<string, CardItem[]> = {
    guides: guides.map(guideToCard),
    recipes: recipes.map(entryToCard),
    ingredients: ingredients.map(entryToCard),
    drinks: drinks.map(entryToCard),
    crops: crops.map(entryToCard),
    fish: fish.map(entryToCard),
    fishing: fish.map(entryToCard),
    mining: [
      {
        title: "Mining Basics",
        href: "/guides/mining-basics",
        description: "Gather materials with a clear upgrade plan and avoid cluttering storage.",
        meta: "Guide",
      },
    ],
    crafting: craftingStations.map(entryToCard),
    npcs: [
      {
        title: "Tavern Customers",
        href: "/guides/how-to-get-more-customers",
        description: "Understand how customer growth depends on stock, service flow, and reputation.",
        meta: "Tavern Management",
      },
    ],
  };

  return maps[slug] ?? [];
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getDrink(slug: string): Drink | undefined {
  return drinks.find((drink) => drink.slug === slug);
}

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function getCrop(slug: string): Crop | undefined {
  return crops.find((crop) => crop.slug === slug);
}

export function getFish(slug: string): Fish | undefined {
  return fish.find((item) => item.slug === slug);
}

export function getCraftingStation(slug: string): CraftingStation | undefined {
  return craftingStations.find((station) => station.slug === slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getLatestGuideCards(limit = 6): CardItem[] {
  return guides.slice(0, limit).map(guideToCard);
}

export function getBeginnerGuideCards(): CardItem[] {
  return guides
    .filter((guide) => guide.category === "Beginner Guides")
    .slice(0, 4)
    .map(guideToCard);
}

export function getPopularPages(): CardItem[] {
  return [
    "beginner-tavern-guide",
    "how-to-make-money-early-game",
    "how-to-increase-reputation",
    "best-early-game-recipes",
    "brewing-basics",
    "crafting-stations",
  ]
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => Boolean(guide))
    .map(guideToCard);
}

export function getRelatedGuides(currentPath: string): CardItem[] {
  const currentSlug = currentPath.split("/").filter(Boolean).at(-1);
  const currentGuide = currentSlug ? getGuide(currentSlug) : undefined;
  const related = currentGuide
    ? currentGuide.relatedSlugs
        .map((slug) => getGuide(slug))
        .filter((guide): guide is Guide => Boolean(guide))
    : [];
  const fallback = guides.filter((guide) => `/guides/${guide.slug}` !== currentPath);
  const merged = [...related, ...fallback].filter(
    (guide, index, all) => all.findIndex((item) => item.slug === guide.slug) === index,
  );

  return merged.slice(0, 4).map(guideToCard);
}

export function getGuideNavigation(slug: string): {
  previous?: CardItem;
  next?: CardItem;
} {
  const index = guides.findIndex((guide) => guide.slug === slug);

  return {
    previous: index > 0 ? guideToCard(guides[index - 1]) : undefined,
    next: index >= 0 && index < guides.length - 1 ? guideToCard(guides[index + 1]) : undefined,
  };
}

export function getGuideDatabaseLinks(slug: string): CardItem[] {
  const bySlug: Record<string, string[]> = {
    "beginner-tavern-guide": ["/recipes", "/drinks", "/ingredients/barley", "/crops/carrot"],
    "how-to-make-money-early-game": ["/tools/profit-calculator", "/recipes/roast-fish", "/recipes/vegetable-stew", "/drinks/light-beer"],
    "how-to-increase-reputation": ["/recipes", "/drinks", "/crafting/kitchen", "/ingredients"],
    "how-to-get-more-customers": ["/drinks/light-beer", "/recipes/vegetable-stew", "/crafting/dining-table", "/recipes"],
    "brewing-basics": ["/drinks", "/drinks/light-beer", "/ingredients/barley", "/ingredients/hops"],
    "farming-basics": ["/crops", "/crops/carrot", "/ingredients/carrot", "/recipes/vegetable-stew"],
    "fishing-basics": ["/fish", "/fish/river-fish", "/ingredients/any-fish", "/recipes/roast-fish"],
    "mining-basics": ["/crafting", "/crafting/forge", "/crafting/workbench", "/tools/profit-calculator"],
    "crafting-stations": ["/crafting", "/crafting/kitchen", "/crafting/brewing-barrel", "/recipes"],
    "best-early-game-recipes": ["/recipes", "/recipes/roast-fish", "/recipes/vegetable-stew", "/ingredients"],
    "what-to-do-first-week": ["/guides/beginner-tavern-guide", "/guides/how-to-make-money-early-game", "/recipes", "/drinks"],
    "best-early-game-upgrades": ["/crafting", "/crafting/kitchen", "/crafting/brewing-barrel", "/guides/how-to-make-money-early-game"],
    "how-to-avoid-stock-shortages": ["/ingredients", "/recipes", "/drinks", "/guides/farming-basics"],
    "tavern-layout-tips": ["/crafting/dining-table", "/guides/how-to-get-more-customers", "/guides/how-to-increase-reputation", "/crafting"],
    "food-vs-drinks-early-game": ["/recipes", "/drinks", "/guides/brewing-basics", "/guides/best-early-game-recipes"],
  };

  const cards: Record<string, CardItem> = {
    "/recipes": {
      title: "Recipes Database",
      href: "/recipes",
      description: "Browse recipe pages and compare ingredients, stations, and related items.",
      meta: "Recipes",
    },
    "/drinks": {
      title: "Drinks Database",
      href: "/drinks",
      description: "Browse beer, cider, wine, and other drink entries for tavern service planning.",
      meta: "Drinks",
    },
    "/ingredients": {
      title: "Ingredients Database",
      href: "/ingredients",
      description: "Find crop, fish, brewing, animal, and shop ingredients used across recipes and drinks.",
      meta: "Ingredients",
    },
    "/crops": {
      title: "Crops Database",
      href: "/crops",
      description: "Browse crop entries and connect harvest planning to cooking and brewing routes.",
      meta: "Crops",
    },
    "/fish": {
      title: "Fish Database",
      href: "/fish",
      description: "Browse fish entries and connect catches to recipe planning.",
      meta: "Fish",
    },
    "/crafting": {
      title: "Crafting Stations Database",
      href: "/crafting",
      description: "Browse stations used for cooking, brewing, processing, storage, and production planning.",
      meta: "Crafting",
    },
    "/tools/profit-calculator": {
      title: "Profit Calculator",
      href: "/tools/profit-calculator",
      description: "Estimate profit and margin from an item's sell price and ingredient cost.",
      meta: "Tool",
    },
    "/guides/beginner-tavern-guide": guideToCard(getGuide("beginner-tavern-guide")!),
    "/guides/how-to-make-money-early-game": guideToCard(getGuide("how-to-make-money-early-game")!),
    "/guides/how-to-get-more-customers": guideToCard(getGuide("how-to-get-more-customers")!),
    "/guides/how-to-increase-reputation": guideToCard(getGuide("how-to-increase-reputation")!),
    "/guides/farming-basics": guideToCard(getGuide("farming-basics")!),
    "/guides/brewing-basics": guideToCard(getGuide("brewing-basics")!),
    "/guides/best-early-game-recipes": guideToCard(getGuide("best-early-game-recipes")!),
  };

  const entryCards = [...recipes, ...drinks, ...ingredients, ...crops, ...fish, ...craftingStations].reduce<Record<string, CardItem>>((acc, item) => {
    acc[getEntryPath(item)] = {
      title: item.name,
      href: getEntryPath(item),
      description: item.description,
      meta: item.category,
    };
    return acc;
  }, {});

  return (bySlug[slug] ?? ["/recipes", "/drinks", "/ingredients", "/crafting"])
    .map((href) => cards[href] ?? entryCards[href])
    .filter((item): item is CardItem => Boolean(item));
}

export function getGuideInlineLinks(slug: string): CardItem[] {
  const links: Record<string, CardItem[]> = {
    "beginner-tavern-guide": [
      { title: "early money guide", href: "/guides/how-to-make-money-early-game", description: "turn the same stable routine into coins" },
      { title: "reputation guide", href: "/guides/how-to-increase-reputation", description: "connect clean service and stock reliability to tavern growth" },
      { title: "recipes database", href: "/recipes", description: "choose food that matches your actual ingredients" },
      { title: "drinks database", href: "/drinks", description: "keep the bar stocked without overcomplicating brewing" },
    ],
    "how-to-make-money-early-game": [
      { title: "beginner guide", href: "/guides/beginner-tavern-guide", description: "stabilize the day before chasing profit" },
      { title: "best early recipes", href: "/guides/best-early-game-recipes", description: "pick foods you can repeat" },
      { title: "brewing guide", href: "/guides/brewing-basics", description: "avoid drink bottlenecks during service" },
      { title: "profit calculator", href: "/tools/profit-calculator", description: "compare routes with your own current values" },
    ],
    "best-early-game-recipes": [
      { title: "farming guide", href: "/guides/farming-basics", description: "grow ingredients that feed your core menu" },
      { title: "fishing guide", href: "/guides/fishing-basics", description: "turn catches into useful food stock" },
      { title: "recipes database", href: "/recipes", description: "browse food ideas by category" },
      { title: "ingredients database", href: "/ingredients", description: "trace which inputs compete across recipes and drinks" },
    ],
    "brewing-basics": [
      { title: "drinks database", href: "/drinks", description: "compare drink categories and ingredient groups" },
      { title: "farming guide", href: "/guides/farming-basics", description: "protect grain, hops, fruit, and other drink inputs" },
      { title: "stations database", href: "/crafting", description: "plan brewing equipment around your bottleneck" },
      { title: "money guide", href: "/guides/how-to-make-money-early-game", description: "turn reliable drinks into steadier income" },
    ],
    "farming-basics": [
      { title: "ingredients database", href: "/ingredients", description: "connect crops to cooking and brewing inputs" },
      { title: "crops database", href: "/crops", description: "browse crop entries before planning fields" },
      { title: "recipe guide", href: "/guides/best-early-game-recipes", description: "grow for the foods you actually serve" },
      { title: "brewing guide", href: "/guides/brewing-basics", description: "keep drink chains supplied" },
    ],
    "fishing-basics": [
      { title: "fish database", href: "/fish", description: "connect catches to recipe planning" },
      { title: "recipe guide", href: "/guides/best-early-game-recipes", description: "decide when fish belongs in your core menu" },
      { title: "money guide", href: "/guides/how-to-make-money-early-game", description: "compare fishing time against tavern service" },
      { title: "ingredients database", href: "/ingredients", description: "see how fish works as a flexible ingredient group" },
    ],
    "crafting-stations": [
      { title: "stations database", href: "/crafting", description: "browse production stations and their use cases" },
      { title: "mining guide", href: "/guides/mining-basics", description: "gather materials with a station goal" },
      { title: "brewing guide", href: "/guides/brewing-basics", description: "spot drink production bottlenecks" },
      { title: "recipes database", href: "/recipes", description: "choose stations that support food you will actually make" },
    ],
    "how-to-increase-reputation": [
      { title: "customer guide", href: "/guides/how-to-get-more-customers", description: "grow traffic only after service is ready" },
      { title: "beginner guide", href: "/guides/beginner-tavern-guide", description: "repair the daily loop first" },
      { title: "recipes database", href: "/recipes", description: "keep food service dependable" },
      { title: "drinks database", href: "/drinks", description: "avoid bar shortages during busy days" },
    ],
    "how-to-get-more-customers": [
      { title: "reputation guide", href: "/guides/how-to-increase-reputation", description: "make demand growth sustainable" },
      { title: "tavern layout tips", href: "/guides/tavern-layout-tips", description: "reduce pathing and cleaning friction" },
      { title: "recipes database", href: "/recipes", description: "stock food before increasing traffic" },
      { title: "drinks database", href: "/drinks", description: "keep drink service from becoming the bottleneck" },
    ],
    "what-to-do-first-week": [
      { title: "beginner guide", href: "/guides/beginner-tavern-guide", description: "learn the core daily loop" },
      { title: "money guide", href: "/guides/how-to-make-money-early-game", description: "turn first-week stability into coins" },
      { title: "recipes database", href: "/recipes", description: "choose early foods with replaceable ingredients" },
      { title: "drinks database", href: "/drinks", description: "plan a simple bar baseline" },
    ],
    "best-early-game-upgrades": [
      { title: "money guide", href: "/guides/how-to-make-money-early-game", description: "spend coins on bottlenecks instead of impulse upgrades" },
      { title: "stations database", href: "/crafting", description: "compare production tools before building" },
      { title: "layout tips", href: "/guides/tavern-layout-tips", description: "avoid room upgrades that slow service" },
      { title: "crafting guide", href: "/guides/crafting-stations", description: "connect station choices to menu goals" },
    ],
    "how-to-avoid-stock-shortages": [
      { title: "ingredients database", href: "/ingredients", description: "track shared inputs across cooking and brewing" },
      { title: "farming guide", href: "/guides/farming-basics", description: "grow for your menu instead of guessing" },
      { title: "brewing guide", href: "/guides/brewing-basics", description: "protect drink chains from late preparation" },
      { title: "recipe guide", href: "/guides/best-early-game-recipes", description: "build a core menu that can be restocked" },
    ],
    "tavern-layout-tips": [
      { title: "customer guide", href: "/guides/how-to-get-more-customers", description: "add traffic only when the room can handle it" },
      { title: "reputation guide", href: "/guides/how-to-increase-reputation", description: "connect service flow to tavern growth" },
      { title: "stations database", href: "/crafting", description: "separate production tools from customer paths" },
      { title: "upgrade guide", href: "/guides/best-early-game-upgrades", description: "choose room changes that solve real problems" },
    ],
    "food-vs-drinks-early-game": [
      { title: "brewing guide", href: "/guides/brewing-basics", description: "make the drink side reliable" },
      { title: "recipe guide", href: "/guides/best-early-game-recipes", description: "make the food side repeatable" },
      { title: "recipes database", href: "/recipes", description: "browse practical early food ideas" },
      { title: "drinks database", href: "/drinks", description: "compare drink categories without overexpanding" },
    ],
  };

  return links[slug] ?? [
    { title: "beginner guide", href: "/guides/beginner-tavern-guide", description: "anchor the topic in a stable early routine" },
    { title: "money guide", href: "/guides/how-to-make-money-early-game", description: "connect decisions to income" },
    { title: "reputation guide", href: "/guides/how-to-increase-reputation", description: "connect decisions to service quality" },
    { title: "stations database", href: "/crafting", description: "check production tools before expanding" },
  ];
}

export function getGuideChecklist(slug: string): string[] {
  const checklists: Record<string, string[]> = {
    "beginner-tavern-guide": [
      "Before opening, confirm there is at least one dependable food plan and one dependable drink plan ready for service.",
      "Before expanding seats or room size, make sure cleaning, walking paths, and stock refills already feel calm.",
      "Before adding a new system, decide which bottleneck it solves: food, drink, money, reputation, layout, or station time.",
      "After each service day, note what ran out, what customers waited for, and which chore interrupted you most often.",
      "Keep one simple next goal so farming, cooking, brewing, and spending all support the same tavern loop.",
    ],
    "how-to-make-money-early-game": [
      "Before spending coins, name the bottleneck the purchase fixes; skip it if the answer is vague.",
      "Before relying on a recipe, confirm its ingredients can be replaced by your current farming, fishing, or shop routine.",
      "Before opening, stock the items that sold out yesterday before experimenting with new products.",
      "After a profitable day, reinvest in production or service flow rather than expanding demand too quickly.",
      "Use manual sell price and cost checks for exact values, because version changes can shift fixed tables.",
    ],
    "best-early-game-recipes": [
      "Before adding a recipe, identify its ingredient source, station dependency, and competing uses.",
      "Keep a core menu small enough that you can restock it before opening without panic crafting.",
      "Test one new recipe at a time and watch whether it improves service or creates shortages.",
      "Protect ingredients that your brewing plan also needs, especially if drinks are carrying income.",
      "Favor repeatable food over impressive food when the tavern is still stabilizing.",
    ],
    "brewing-basics": [
      "Before brewing, reserve crop and grain inputs so cooking does not accidentally consume the drink chain.",
      "Check whether the bottleneck is ingredients, station time, storage, or opening before drinks are ready.",
      "Keep one baseline drink reliable before adding specialty beers, ciders, wines, or meads.",
      "Schedule drink production before service when possible so the bar is not waiting on late batches.",
      "Use the drinks database as a planning map, then confirm exact values in your current version.",
    ],
    "farming-basics": [
      "Before planting, choose crops that support your current food and drink menu, not every possible future recipe.",
      "Keep a reserve of ingredients that appear in multiple recipes or drink chains.",
      "After service, compare what sold with what stayed in storage and adjust the next planting plan.",
      "Do not expand the field if harvesting and processing already steal time from tavern preparation.",
      "Use farming to reduce uncertainty: tomorrow's menu should be easier because of today's planting choice.",
    ],
    "fishing-basics": [
      "Before fishing, decide whether the trip solves a food shortage or simply delays tavern preparation.",
      "Turn consistent catches into a planned menu item instead of leaving fish as idle storage.",
      "Stop fishing earlier on days when cleaning, brewing, or cooking still needs attention before opening.",
      "Use fish as flexible support when crops are not ready, but avoid building around catches you cannot repeat.",
      "Pair fishing with recipe planning so each trip has a clear service purpose.",
    ],
    "crafting-stations": [
      "Before buying or building a station, list the products it will make this week, not someday.",
      "Check whether the station needs ingredients, mined materials, or storage habits you cannot yet support.",
      "Add one new production chain at a time and watch the next service day for new shortages.",
      "Prioritize stations that remove a repeated bottleneck in cooking, brewing, storage, or room flow.",
      "Delay stations that would sit idle because the farm, fishing routine, or ingredient supply is not ready.",
    ],
    "how-to-increase-reputation": [
      "Before chasing reputation, fix the service problem you see every day: stock, cleaning, waiting, or layout.",
      "Open only after core food and drinks are ready enough to handle normal demand.",
      "Improve comfort and flow together; a nicer room should still be easy to operate.",
      "Avoid adding customer capacity before current customers are consistently served.",
      "Use reputation problems as clues pointing to the weakest support system.",
    ],
    "how-to-get-more-customers": [
      "Before increasing traffic, confirm the current room can stay stocked, clean, and easy to navigate.",
      "Add capacity in small steps, then observe the next service day before expanding again.",
      "Keep drink and food supply balanced so a crowd does not empty one side of the menu immediately.",
      "Fix pathing and table placement before assuming you need more production.",
      "If the tavern feels frantic, pause growth and repair the bottleneck first.",
    ],
    "what-to-do-first-week": [
      "Before each first-week opening, check food, drinks, cleaning, and one clear task for after service.",
      "Before spending coins, decide whether stock, layout, production, or reputation is the current bottleneck.",
      "Before adding menu variety, confirm your current food and drink baseline survived the previous day.",
      "After each service day, write down the first item or chore that failed and fix that tomorrow.",
      "Keep early farming, fishing, and brewing choices tied to the menu you actually serve.",
    ],
    "best-early-game-upgrades": [
      "Before buying an upgrade, name the repeated problem it fixes and how tomorrow becomes easier.",
      "Before adding seats, confirm stock and cleaning can handle more customer pressure.",
      "Before buying a station, list the products it will make with ingredients you already control.",
      "After upgrading, run a normal service day before adding another new system.",
      "Delay upgrades that create chores without improving food, drinks, layout, or station flow.",
    ],
    "how-to-avoid-stock-shortages": [
      "Before opening, check core food, core drinks, and the ingredient that ran out last time.",
      "Before using shared ingredients, decide whether cooking or brewing gets priority today.",
      "Before changing the menu, confirm the farm, fishing route, or shop habit can support it.",
      "Keep reserves for ingredients that would break multiple products if they disappeared.",
      "After service, reduce items that sit unused and increase supply for items that repeatedly run out.",
    ],
    "tavern-layout-tips": [
      "Before moving furniture, identify the path you walk most often during service.",
      "Before adding tables, confirm cleaning and stock can handle the extra customer flow.",
      "Keep work paths clear around service, cleaning, storage, and production decision points.",
      "After a busy day, adjust the spot where you got stuck, delayed, or distracted most often.",
      "Treat decoration as a support to readability, not a reason to crowd the room.",
    ],
    "food-vs-drinks-early-game": [
      "Before opening, make sure one baseline food and one baseline drink are ready.",
      "Before using shared ingredients, choose whether the food chain or drink chain needs them more.",
      "If food runs out first, improve recipes, farming, fishing, or kitchen preparation before adding drinks.",
      "If drinks run out first, protect brewing inputs and prepare batches before service pressure starts.",
      "Add variety only after both the food side and drink side can survive a normal service day.",
    ],
  };

  return checklists[slug] ?? [
    "Before changing the tavern plan, identify the bottleneck this change is supposed to fix.",
    "Check whether food, drinks, ingredients, station time, and cleaning can support the change.",
    "Make one change at a time so the next service day tells you whether it helped.",
    "Watch for new shortages after the change and adjust the core menu before expanding again.",
    "Use exact in-game values when making final profit decisions, but use this checklist to keep the system stable.",
  ];
}

export function getGuideMistakes(slug: string): string[] {
  const mistakes: Record<string, string[]> = {
    "beginner-tavern-guide": [
      "Opening before food, drinks, and cleaning are ready, then spending the whole service reacting to shortages.",
      "Unlocking new systems faster than the tavern can supply them, which makes the day feel busy without improving income.",
      "Ignoring small layout friction because it looks harmless; repeated walking and cleaning problems add up over many service days.",
    ],
    "how-to-make-money-early-game": [
      "Chasing one theoretical best item while the tavern runs out of dependable stock.",
      "Selling or consuming ingredients before deciding which recipe or drink chain needs them most.",
      "Buying upgrades that look exciting but do not solve the bottleneck limiting today's income.",
    ],
    "how-to-increase-reputation": [
      "Trying to force reputation growth with expansion while service quality, stock, and cleanliness are still inconsistent.",
      "Treating reputation as a separate grind instead of the result of many reliable service days.",
      "Adding more seats or menu variety before the tavern can serve the customers it already has.",
    ],
    "how-to-get-more-customers": [
      "Pushing customer traffic before the menu, drinks, seating, and cleaning routine can absorb the extra demand.",
      "Adding capacity without checking whether production stations and ingredient supply can keep up.",
      "Confusing a bigger room with a smoother room; customers are easier to serve when paths and work zones stay readable.",
    ],
    "brewing-basics": [
      "Starting too many drink chains at once and draining ingredients that the kitchen or farm plan also needs.",
      "Waiting until service starts to notice that drinks are unfinished, unstocked, or blocked behind station time.",
      "Judging brewing only by product value instead of ingredient reliability, station capacity, and service timing.",
    ],
    "farming-basics": [
      "Growing a wide mix of crops without connecting them to the recipes and drinks actually served in the tavern.",
      "Letting storage fill with unused harvests while key menu ingredients run short.",
      "Changing the farm plan based on guesses instead of reviewing what sold, what ran out, and what stayed unused.",
    ],
    "fishing-basics": [
      "Fishing for most of the day when the tavern still needs preparation, cleaning, farming, or brewing attention.",
      "Keeping catches in storage instead of turning reliable fish supply into practical menu value.",
      "Building a core food plan around fish you cannot catch consistently in your current routine.",
    ],
    "mining-basics": [
      "Mining without a station, upgrade, or material goal, then returning with clutter instead of progress.",
      "Leaving the tavern understocked for a mining trip and losing service quality afterward.",
      "Gathering materials before identifying whether the real bottleneck is equipment, ingredients, layout, or service timing.",
    ],
    "crafting-stations": [
      "Building several new stations at once before the farm, storage, and service routine can support the new chains.",
      "Choosing stations because they are new rather than because they remove a bottleneck from the current tavern loop.",
      "Forgetting that stations still need ingredients and time; idle equipment is not progress by itself.",
    ],
    "best-early-game-recipes": [
      "Choosing recipes only by expected value while ignoring whether the ingredients can be replaced consistently.",
      "Adding too many menu items before a small core menu can stay stocked through normal service.",
      "Using key brewing, farming, or animal ingredients in recipes without checking what other products depend on them.",
    ],
  };

  const sharedMistakes = [
    "Opening with weak preparation slows the whole day because you spend service time fixing yesterday's planning problem. Correct it by checking food, drinks, cleaning, and station queues before customers arrive.",
    "Expanding demand before supply is ready creates shortages, waiting, and messy service flow. Correct it by improving one bottleneck first, then watching the next service day before expanding again.",
    "Adding variety without a core menu makes storage and production harder to read. Correct it by keeping a small repeatable menu, then testing one new item at a time.",
    "Ignoring layout and cleaning flow turns small messes into repeated service delays. Correct it by keeping work paths clear and reviewing the room after busy days.",
    "Judging progress only by one item value can hide ingredient and time costs. Correct it by looking at the full chain from ingredient source to station time to customer service.",
  ];

  return [...(mistakes[slug] ?? []), ...sharedMistakes].slice(0, 5);
}

export function getUsedInRecipes(slug: string): Recipe[] {
  return recipes.filter((recipe) => recipe.ingredientSlugs.includes(slug));
}

export function getUsedInDrinks(slug: string): Drink[] {
  return drinks.filter((drink) => drink.ingredientSlugs.includes(slug));
}

export function getRelatedItems(entry: DatabaseEntry): CardItem[] {
  if (entry.kind === "recipe") {
    const ingredientCards = entry.ingredientSlugs
      .map((slug) => ingredients.find((ingredient) => ingredient.slug === slug))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient))
      .map(entryToCard);
    const station = getCraftingStation(entry.stationSlug);
    return [...ingredientCards, ...(station ? [entryToCard(station)] : [])].slice(0, 8);
  }

  if (entry.kind === "ingredient") {
    const usedRecipes = getUsedInRecipes(entry.slug).map(entryToCard);
    const usedDrinks = getUsedInDrinks(entry.slug).map(entryToCard);
    const relatedCrops = crops.filter((crop) => crop.growsIntoSlug === entry.slug).map(entryToCard);
    return [...usedRecipes, ...usedDrinks, ...relatedCrops].slice(0, 8);
  }

  if (entry.kind === "drink") {
    return entry.ingredientSlugs
      .map((slug) => ingredients.find((ingredient) => ingredient.slug === slug))
      .filter((ingredient): ingredient is Ingredient => Boolean(ingredient))
      .map(entryToCard)
      .slice(0, 8);
  }

  if (entry.kind === "crop") {
    const growsInto = getIngredient(entry.growsIntoSlug);
    const usedRecipes = getUsedInRecipes(entry.growsIntoSlug).map(entryToCard);
    return [...(growsInto ? [entryToCard(growsInto)] : []), ...usedRecipes].slice(0, 8);
  }

  if (entry.kind === "fish") {
    return entry.usedInRecipeSlugs
      .map((slug) => getRecipe(slug))
      .filter((recipe): recipe is Recipe => Boolean(recipe))
      .map(entryToCard);
  }

  return [...recipes.filter((recipe) => recipe.stationSlug === entry.slug), ...drinks.filter((drink) => drink.stationSlug === entry.slug)]
    .map(entryToCard)
    .slice(0, 8);
}
