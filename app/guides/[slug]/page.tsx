import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { guides } from "@/data/all-guides";
import { getGuide, getGuideChecklist, getGuideDatabaseLinks, getGuideInlineLinks, getGuideMistakes, getGuideToolLinks, getRelatedGuides } from "@/lib/content";
import { articleSchema, breadcrumbSchema, createMetadata, faqSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return createMetadata({
      title: "Guide Not Found",
      description: "This Travellers Rest guide page is not available yet.",
      path: "/guides",
    });
  }

  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    keywords: guide.keywords,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const path = `/guides/${guide.slug}`;
  const relatedGuides = getRelatedGuides(path);
  const databaseLinks = getGuideDatabaseLinks(guide.slug);
  const checklist = getGuideChecklist(guide.slug);
  const inlineLinks = getGuideInlineLinks(guide.slug);
  const mistakes = getGuideMistakes(guide.slug);
  const toolLinks = getGuideToolLinks(guide.slug);
  const toc = [
    ...guide.sections.map((section) => ({ id: section.id, title: section.title })),
    { id: "practical-checklist", title: "Practical Checklist" },
    { id: "common-mistakes", title: "Common Mistakes" },
    { id: "faq-heading", title: "FAQ" },
    { id: "related-tools", title: "Related Tools" },
    { id: "related-database-pages", title: "Related Database Pages" },
    { id: "recommended-next", title: "Recommended Next" },
    { id: "guide-info", title: "Info" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <JsonLd
        data={[
          articleSchema({
            title: guide.title,
            description: guide.description,
            path,
            dateModified: guide.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]),
          faqSchema(guide.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: path },
        ]}
      />
      <article className="mt-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">{guide.category}</p>
        <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-300">{guide.description}</p>
        <p className="mt-4 max-w-3xl text-stone-300">
          Exact values can change by version, so this guide focuses on decision logic, daily routines, and practical Travellers Rest systems instead of fixed price tables.
        </p>

        <div className="mt-8 max-w-3xl">
          <TableOfContents items={toc} />
        </div>

        <section className="mt-10 wood-panel rounded-lg p-5" aria-labelledby="guide-route-heading">
          <h2 id="guide-route-heading" className="text-xl font-bold text-amber-50">
            Use This Guide With
          </h2>
          <ul className="mt-3 space-y-2 text-stone-300">
            {inlineLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-bold text-amber-200 hover:text-amber-100">
                  {item.title}
                </Link>
                <span className="text-stone-400"> - {item.description}</span>
              </li>
            ))}
          </ul>
        </section>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">{section.title}</h2>
            <div className="mt-3 space-y-4 text-stone-300">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <section id="practical-checklist" className="mt-10">
          <h2 className="text-2xl font-bold text-amber-50">Practical Checklist</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="rounded border border-amber-200/15 bg-[#120c08]/70 p-4 text-stone-300">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="common-mistakes" className="mt-10">
          <h2 className="text-2xl font-bold text-amber-50">Common Mistakes</h2>
          <ul className="mt-4 space-y-3 text-stone-300">
            {mistakes.map((mistake) => (
              <li key={mistake} className="rounded border border-amber-200/15 bg-[#120c08]/70 p-4">
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <Faq items={guide.faq} />
        </div>

        <section className="mt-10" aria-labelledby="related-tools">
          <h2 id="related-tools" className="text-2xl font-bold text-amber-50">
            Related Tools
          </h2>
          <p className="mt-3 text-stone-300">
            Use these planning pages when you need to turn the guide into a concrete next action, menu route, or stage priority.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {toolLinks.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="related-database-pages">
          <h2 id="related-database-pages" className="text-2xl font-bold text-amber-50">
            Related Database Pages
          </h2>
          <p className="mt-3 text-stone-300">
            Use these database pages to connect this guide with recipes, ingredients, drinks, crops, fish, and stations you may need while playing.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {databaseLinks.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="recommended-next">
          <h2 id="recommended-next" className="text-2xl font-bold text-amber-50">
            Recommended Next Guides
          </h2>
          <p className="mt-3 text-stone-300">
            Continue with the next guide that improves the same tavern loop, so each change supports stock, service, income, or reputation.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedGuides.map((item) => (
              <ContentCard key={item.href} item={item} />
            ))}
          </div>
        </section>

        <section id="guide-info" className="mt-10">
          <InfoTable
            rows={[
              { label: "Category", value: guide.category },
              { label: "Updated", value: guide.updatedAt },
              { label: "Reading Time", value: guide.readingTime },
              { label: "Content Type", value: "Guide" },
            ]}
          />
        </section>
      </article>
    </main>
  );
}
