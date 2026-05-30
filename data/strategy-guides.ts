import type { Guide } from "@/types/content";

const updatedAt = "2026-05-30";

function strategyGuide(input: {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  quickAnswer: string;
  who: string;
  strategy: string[];
  avoid: string[];
  checklist: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
}): Guide {
  return {
    id: `strategy-${input.slug}`,
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: "Strategy Guides",
    keywords: input.keywords,
    updatedAt,
    readingTime: "7 min read",
    relatedSlugs: input.relatedSlugs,
    sections: [
      {
        id: "who-this-guide-is-for",
        title: "Who This Guide Is For",
        body: [input.who],
      },
      {
        id: "quick-answer",
        title: "Quick Answer",
        body: [input.quickAnswer],
      },
      {
        id: "recommended-strategy",
        title: "Recommended Strategy",
        body: input.strategy,
      },
      {
        id: "what-to-avoid",
        title: "What to Avoid",
        body: input.avoid,
      },
      {
        id: "checklist",
        title: "Checklist",
        body: input.checklist,
      },
    ],
    faq: input.faq,
  };
}

export const strategyGuides: Guide[] = [
  strategyGuide({
    slug: "best-early-game-recipes",
    title: "Travellers Rest Best Early Game Recipes",
    description:
      "Choose early Travellers Rest recipes by ingredient reliability, station pressure, and menu stability instead of unverified profit tables.",
    keywords: ["Travellers Rest best early game recipes", "Travellers Rest recipes", "Travellers Rest menu planner"],
    who: "Use this guide if you have unlocked cooking options but cannot tell which foods deserve a regular menu slot. It is especially useful when your storage has several ingredients but service still runs out of food.",
    quickAnswer:
      "The best early recipes are the ones you can restock tomorrow. Start with flexible vegetable food if farming is stable, fish food if fishing is routine, and simple baked food only after grain processing and oven use are comfortable.",
    strategy: [
      "Pick one core food and one backup food. The core food should use ingredients with a clear source. The backup should use a different ingredient group so one shortage does not break the whole menu.",
      "Use broad ingredient groups to your advantage. Vegetable dishes, fish dishes, and simple grain foods are easier to plan than recipes that depend on a narrow or awkward input chain.",
      "Check station pressure before you commit. A recipe is not beginner-friendly if it blocks the same station you need for the rest of prep.",
    ],
    avoid: [
      "Avoid choosing recipes only because they sound valuable. Exact values need in-game verification, and a high-value idea can still be bad if you cannot restock it.",
      "Avoid using grain, fruit, honey, or yeast casually when brewing is becoming important.",
      "Avoid running too many food categories before you know which ingredient group runs out first.",
    ],
    checklist: [
      "Choose one core food from an ingredient group you can replace.",
      "Keep one backup food that uses a different ingredient group.",
      "Check whether the station is free during prep.",
      "Protect drink inputs before cooking experiments.",
      "Review what sold out after service and adjust tomorrow's menu.",
    ],
    relatedSlugs: ["best-ingredients-to-stockpile", "tavern-inventory-management", "beginner-mistakes"],
    faq: [
      {
        question: "What makes a recipe good early in Travellers Rest?",
        answer: "A good early recipe uses ingredients you can replace consistently, fits your unlocked stations, and does not weaken your drink or reserve plan.",
      },
      {
        question: "Should I cook the highest-value recipe I can make?",
        answer: "Not automatically. Exact values need verification, and reliability often matters more than a one-off item that empties important storage.",
      },
    ],
  }),
  strategyGuide({
    slug: "best-ingredients-to-stockpile",
    title: "Travellers Rest Best Ingredients to Stockpile",
    description:
      "Plan which Travellers Rest ingredients to reserve for cooking, brewing, trends, and stable tavern service without hoarding randomly.",
    keywords: ["Travellers Rest ingredients to stockpile", "Travellers Rest ingredients", "Travellers Rest inventory"],
    who: "Use this guide when storage feels full but the tavern still runs out of the ingredients that matter. It helps separate useful reserves from clutter.",
    quickAnswer:
      "Stockpile ingredient groups that keep multiple systems alive: flexible vegetables, grains or flour, drink inputs, seasonings, fruit for desserts or drinks, and fish only when fishing is reliable.",
    strategy: [
      "Assign every important ingredient a role: core food, drink chain, flexible surplus, trend buffer, or experiment stock. Ingredients with no role should not shape the menu.",
      "Protect shared ingredients first. Grains, fruit, sweeteners, yeast, and herbs can cross between cooking and brewing, so decide priority before production starts.",
      "Keep reserves small and active. A reserve is useful when it prevents tomorrow's shortage; it is clutter when it never turns into service value.",
    ],
    avoid: [
      "Avoid hoarding everything equally. Equal storage priority makes the important shortages harder to see.",
      "Avoid spending core ingredients on surplus recipes before opening.",
      "Avoid planning exact stockpile amounts from unverified data. Use your tavern's repeated shortages as the signal.",
    ],
    checklist: [
      "Mark core food ingredients.",
      "Mark brewing inputs separately.",
      "Keep a flexible vegetable or fish backup if those sources are reliable.",
      "Review unused stock after service.",
      "Use the Menu Planner before changing stockpile priorities.",
    ],
    relatedSlugs: ["tavern-inventory-management", "how-to-prepare-for-trends", "best-early-game-recipes"],
    faq: [
      {
        question: "Should I stockpile exact item counts?",
        answer: "Use exact counts only after checking the current game and your tavern size. The safer strategy is to reserve the ingredient groups that repeatedly protect your menu.",
      },
      {
        question: "What ingredients are risky to spend casually?",
        answer: "Shared inputs are risky: grains, fruit, yeast, honey, herbs, and anything used by both food and drink plans.",
      },
    ],
  }),
  strategyGuide({
    slug: "best-drinks-to-keep-on-tap",
    title: "Travellers Rest Best Drinks to Keep on Tap",
    description:
      "Choose reliable Travellers Rest drinks by baseline supply, brewing inputs, keg flow, and aging decisions instead of unverified value rankings.",
    keywords: ["Travellers Rest best drinks", "Travellers Rest drinks", "Travellers Rest brewing"],
    who: "Use this guide when the bar runs dry, brewing feels hard to schedule, or you are unsure whether to diversify drinks.",
    quickAnswer:
      "Keep one baseline drink on tap before adding variety. The best drink is the one your farm, processing, and keg flow can keep ready before service.",
    strategy: [
      "Start with a dependable baseline drink. Protect its inputs from cooking, then expand into a second drink only when the first survives normal demand.",
      "Separate service drinks from aging experiments. Drinks meant for today's service should not all be locked into longer value plans.",
      "Use drink categories to plan supply. Grain drinks, fruit drinks, honey drinks, and specialty drinks each need different reserves.",
    ],
    avoid: [
      "Avoid opening before finished drinks are ready to serve.",
      "Avoid starting several drink chains with thin ingredient reserves.",
      "Avoid judging drinks only by expected value. Timing, storage, and input reliability matter.",
    ],
    checklist: [
      "Choose one baseline drink.",
      "Reserve its ingredients before cooking.",
      "Confirm finished drinks can reach service storage.",
      "Keep flexible stock outside aging plans.",
      "Add a second drink only after the baseline is reliable.",
    ],
    relatedSlugs: ["brewing-basics", "best-ingredients-to-stockpile", "how-to-prepare-for-trends"],
    faq: [
      {
        question: "Should I age every drink?",
        answer: "No. Aging can be useful, but service stock needs flexibility. Keep enough non-aged or ready stock for normal demand.",
      },
      {
        question: "How many drinks should I run?",
        answer: "Run as many as your ingredients, stations, and service storage can support without emptying the baseline drink.",
      },
    ],
  }),
  strategyGuide({
    slug: "how-to-prepare-for-trends",
    title: "Travellers Rest How to Prepare for Trends",
    description:
      "Prepare for Travellers Rest trends with flexible ingredient groups, menu buffers, and stock planning without draining your normal tavern service.",
    keywords: ["Travellers Rest trends", "Travellers Rest prepare for trends", "Travellers Rest menu planning"],
    who: "Use this guide when you want to respond to trends but do not want the normal menu to collapse while chasing them.",
    quickAnswer:
      "Prepare by holding flexible ingredient groups, not by betting everything on one exact item. Keep the core menu intact, then add a trend slot when the required category appears.",
    strategy: [
      "Build category buffers: vegetables, fruit, grains, fish or meat, and drink inputs. These let you pivot without rebuilding storage.",
      "Keep the trend menu separate from the core menu. The core menu pays for the day; the trend slot is the flexible layer.",
      "Use the database to identify candidate recipes or drinks, then verify exact requirements and values in game before heavy production.",
    ],
    avoid: [
      "Avoid draining the everyday menu to chase a trend.",
      "Avoid preparing only one exact product if the trend can be served by a broader ingredient group.",
      "Avoid locking all drink stock into aging when you may need flexible response stock.",
    ],
    checklist: [
      "Keep core food and drink protected.",
      "Hold flexible ingredient groups for trend response.",
      "Check recipe and drink pages for candidate items.",
      "Make one trend slot instead of replacing the whole menu.",
      "Review whether the trend created a new shortage afterward.",
    ],
    relatedSlugs: ["menu-planner", "best-ingredients-to-stockpile", "tavern-inventory-management"],
    faq: [
      {
        question: "Do I need exact trend values to prepare?",
        answer: "Exact values should be checked in game. For planning, focus on flexible categories and avoid weakening the core menu.",
      },
      {
        question: "Should trends replace my normal menu?",
        answer: "Usually no. Treat trends as a focused addition unless your supply chain is strong enough to pivot safely.",
      },
    ],
  }),
  strategyGuide({
    slug: "staff-hiring-order",
    title: "Travellers Rest Staff Hiring Order",
    description:
      "Decide which Travellers Rest staff role to prioritize by identifying the service chore that most often breaks your tavern flow.",
    keywords: ["Travellers Rest staff", "Travellers Rest hiring order", "Travellers Rest reputation"],
    who: "Use this guide when staff unlocks and you are not sure whether to hire immediately, wait, or change your tavern routine first.",
    quickAnswer:
      "Hire for the repeated bottleneck, not for the unlock screen. If cleaning pulls you away, solve cleaning. If serving interrupts prep, solve serving. If rooms add pressure, hire only after stock and service can support them.",
    strategy: [
      "Observe a normal day before hiring. The best first hire is the role that removes the task you abandon most often during service.",
      "Stabilize menu stock first. Staff can multiply a good system, but they cannot make missing food or drinks appear.",
      "Add staff and capacity in separate steps. Learn what the hire changes before increasing demand again.",
    ],
    avoid: [
      "Avoid hiring just because staff unlocked.",
      "Avoid expanding seats, rooms, and staff coverage all on the same day.",
      "Avoid using staff to hide a menu problem that needs ingredient planning.",
    ],
    checklist: [
      "Write down the service task that interrupts you most.",
      "Check whether food and drinks survive normal demand.",
      "Hire for the bottleneck you can name.",
      "Run a normal service day before expanding.",
      "Use reputation goals to decide the next staff investment.",
    ],
    relatedSlugs: ["how-to-increase-reputation", "tavern-inventory-management", "beginner-mistakes"],
    faq: [
      {
        question: "What staff should I hire first?",
        answer: "The best first hire depends on your bottleneck. Choose the role that removes the chore most often hurting service quality.",
      },
      {
        question: "Should I hire staff as soon as I unlock them?",
        answer: "Only if your stock and service flow are ready. Hiring too early can add cost without fixing the real problem.",
      },
    ],
  }),
  strategyGuide({
    slug: "how-to-increase-reputation",
    title: "Travellers Rest How to Increase Reputation",
    description:
      "Increase Travellers Rest reputation through reliable stock, cleaner service, better room flow, controlled expansion, and staff planning.",
    keywords: ["Travellers Rest reputation", "increase reputation Travellers Rest", "Travellers Rest tavern management"],
    who: "Use this guide when reputation feels slow or inconsistent and you need to know which tavern problem to fix first.",
    quickAnswer:
      "Reputation improves when the average service day improves. Open prepared, keep food and drinks available, maintain clear paths, clean consistently, and expand demand only when the tavern can support it.",
    strategy: [
      "Treat reputation as the result of service quality. Stock, cleanliness, movement, menu reliability, and customer flow all matter together.",
      "Fix repeated friction before adding demand. If customers wait, food runs out, or cleaning interrupts every day, solve that bottleneck first.",
      "Use staff and layout changes to protect service consistency after the core menu is reliable.",
    ],
    avoid: [
      "Avoid chasing reputation with expansion while the current room is already chaotic.",
      "Avoid adding menu variety if the existing menu runs out.",
      "Avoid ignoring small layout problems that repeat every service day.",
    ],
    checklist: [
      "Open with core stock ready.",
      "Keep work paths clear.",
      "Fix the shortage that appears most often.",
      "Add capacity in small steps.",
      "Use staff to support a stable routine.",
    ],
    relatedSlugs: ["staff-hiring-order", "beginner-mistakes", "tavern-inventory-management"],
    faq: [
      {
        question: "What is the fastest way to increase reputation?",
        answer: "The safest route is consistent service: ready stock, clean room, clear paths, and controlled demand. Exact mechanics should be checked in game.",
      },
      {
        question: "Does menu planning affect reputation?",
        answer: "Yes. A menu you can keep stocked supports better service, which supports reputation progress.",
      },
    ],
  }),
  strategyGuide({
    slug: "tavern-inventory-management",
    title: "Travellers Rest Tavern Inventory Management",
    description:
      "Manage Travellers Rest inventory by separating core stock, surplus, brewing inputs, trend buffers, and experiment ingredients.",
    keywords: ["Travellers Rest inventory management", "Travellers Rest stock", "Travellers Rest ingredients"],
    who: "Use this guide when storage is messy, ingredients disappear unexpectedly, or you cannot tell what tomorrow's menu can actually support.",
    quickAnswer:
      "Inventory works best when every ingredient has a job: core menu, drink input, flexible surplus, trend buffer, or experiment. Review those jobs after service.",
    strategy: [
      "Build a core list for the food and drinks that must survive a normal day. These ingredients get protected before experiments.",
      "Create a surplus lane. Surplus can become rotating recipes, but it should not steal from the core menu.",
      "Review storage after service, not before you forget what happened. What ran out first and what stayed unused should shape tomorrow's plan.",
    ],
    avoid: [
      "Avoid treating full storage as healthy storage.",
      "Avoid letting experiments consume station time or shared ingredients before the core menu is safe.",
      "Avoid exact stock rules until you verify your current version and tavern size.",
    ],
    checklist: [
      "Separate core food ingredients.",
      "Separate drink inputs.",
      "Create a surplus group.",
      "Keep trend buffers flexible.",
      "Adjust after each service day.",
    ],
    relatedSlugs: ["best-ingredients-to-stockpile", "how-to-prepare-for-trends", "best-early-game-recipes"],
    faq: [
      {
        question: "How do I stop running out of ingredients?",
        answer: "Reduce the menu, protect shared ingredients, and assign each ingredient a role before production starts.",
      },
      {
        question: "Is hoarding useful?",
        answer: "Only when it protects a known menu or trend need. Random hoarding makes the next decision harder.",
      },
    ],
  }),
  strategyGuide({
    slug: "beginner-mistakes",
    title: "Travellers Rest Beginner Mistakes",
    description:
      "Avoid common Travellers Rest beginner mistakes around overexpansion, weak stock planning, messy inventory, staff timing, and menu bloat.",
    keywords: ["Travellers Rest beginner mistakes", "Travellers Rest beginner guide", "Travellers Rest tips"],
    who: "Use this guide if the tavern feels busy but not better, or if every new unlock seems to create a new shortage.",
    quickAnswer:
      "Most beginner mistakes come from expanding demand faster than supply. Keep the menu small, protect ingredients, prepare before opening, and fix one bottleneck at a time.",
    strategy: [
      "Use each day as feedback. The first thing that fails is usually tomorrow's first task.",
      "Keep new systems contained. When you unlock fishing, brewing, staff, or guest rooms, connect the system to one clear tavern problem before expanding.",
      "Prefer repeatability over novelty. A simple menu that survives service is better than a wide menu that empties storage.",
    ],
    avoid: [
      "Avoid opening before food, drinks, and cleaning are ready.",
      "Avoid buying upgrades without naming the bottleneck they fix.",
      "Avoid adding customers, staff, rooms, recipes, and stations all at once.",
    ],
    checklist: [
      "Check food before opening.",
      "Check drinks before opening.",
      "Clean and keep paths readable.",
      "Write down the first shortage.",
      "Make one improvement before adding another system.",
    ],
    relatedSlugs: ["best-early-game-recipes", "how-to-increase-reputation", "staff-hiring-order"],
    faq: [
      {
        question: "What is the biggest beginner mistake?",
        answer: "Overexpansion. More seats, recipes, or systems can hurt if stock, cleaning, and service flow are not ready.",
      },
      {
        question: "How should I choose my next task?",
        answer: "Choose the bottleneck that interrupted your last service day: food, drinks, ingredients, cleaning, layout, staff, or station flow.",
      },
    ],
  }),
];
