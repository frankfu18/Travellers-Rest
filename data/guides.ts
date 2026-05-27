import type { Guide } from "@/types/content";

export const guides: Guide[] = [
  {
    id: "guide-beginner-tavern",
    slug: "beginner-tavern-guide",
    title: "Beginner Tavern Guide",
    description: "A practical starter route for early reputation, food service, cleaning, and production planning.",
    category: "Beginner Guides",
    updatedAt: "2026-05-27",
    readingTime: "6 min read",
    sections: [
      {
        id: "early-priorities",
        title: "Early Priorities",
        body: "Focus on keeping tables clean, stocking simple food and drink, and improving the tavern layout before chasing complex production chains.",
      },
      {
        id: "production-loop",
        title: "Build a Reliable Production Loop",
        body: "Pick a small number of recipes and ingredients, then scale them steadily. A reliable menu beats a wide menu that runs out during service.",
      },
      {
        id: "reputation",
        title: "Reputation Growth",
        body: "Reputation rises more smoothly when customers are served quickly, the tavern stays tidy, and core needs are handled every day.",
      },
    ],
    faq: [
      {
        question: "What should I upgrade first in Travellers Rest?",
        answer: "Upgrade the parts of your tavern that reduce daily friction: seating, cleaning flow, and dependable production.",
      },
      {
        question: "Should I expand the tavern immediately?",
        answer: "Expand after your food and drink supply can support more customers.",
      },
    ],
  },
  {
    id: "guide-brewing-basics",
    slug: "brewing-basics",
    title: "Brewing Basics",
    description: "A simple overview of brewing chains, drink planning, and why grains matter.",
    category: "Brewing",
    updatedAt: "2026-05-27",
    readingTime: "5 min read",
    sections: [
      {
        id: "grain-supply",
        title: "Secure Grain Supply",
        body: "Brewing depends on consistent ingredients. Keep basic crops and processing inputs ahead of customer demand.",
      },
      {
        id: "station-planning",
        title: "Plan Around Stations",
        body: "Brewing stations create bottlenecks. Add capacity only when your inputs and service demand justify it.",
      },
    ],
    faq: [
      {
        question: "Is brewing profitable?",
        answer: "Brewing can become a strong profit engine once production timing and ingredient supply are stable.",
      },
      {
        question: "What should I brew first?",
        answer: "Start with simple drinks that use easy-to-grow ingredients before moving into specialty chains.",
      },
    ],
  },
];
