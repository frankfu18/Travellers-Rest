# Travellers Rest Guide Database

A lightweight Next.js App Router website for a Travellers Rest wiki-style guide database. The first phase focuses on SEO, static generation, clean URLs, and data files that are easy to expand or generate with AI.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Static content from local TypeScript files
- No database, login system, backend API, Prisma, Firebase, Supabase, or CMS

## Project Structure

```txt
app/         Route pages, metadata, sitemap, robots, and global layout
components/  Reusable UI blocks such as cards, breadcrumbs, info tables, FAQ, TOC
data/        Mock content records for recipes, ingredients, guides, categories, and placeholders
lib/         Site config, SEO helpers, and content lookup helpers
types/       Shared TypeScript content models
public/      Static assets such as the tavern hero image
```

## Content Expansion

Add new entries to `data/recipes.ts`, `data/ingredients.ts`, or `data/guides.ts`. Pages under `/recipes/[slug]`, `/ingredients/[slug]`, and `/guides/[slug]` are generated from these records with `generateStaticParams`.

For AI batch generation, produce records that match the types in `types/content.ts`, validate slugs, then append them to the relevant data file. Category pages will pick them up automatically through `lib/content.ts`.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run typecheck
npm run build
```
