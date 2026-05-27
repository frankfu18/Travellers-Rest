import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { guides } from "@/data/guides";
import { getGuide, getGuideDatabaseLinks, getGuideMistakes, getGuideNavigation, getRelatedGuides } from "@/lib/content";
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
  const mistakes = getGuideMistakes(guide.slug);
  const navigation = getGuideNavigation(guide.slug);
  const toc = [
    ...guide.sections.map((section) => ({ id: section.id, title: section.title })),
    { id: "common-early-mistakes", title: "Common Early Mistakes" },
    { id: "faq-heading", title: "FAQ" },
    { id: "related-database-pages", title: "Related Database Pages" },
    { id: "recommended-next", title: "Recommended Next" },
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
      <article className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c35a]">{guide.category}</p>
          <h1 className="mt-3 text-4xl font-black text-amber-50 lg:text-5xl">{guide.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-stone-300">{guide.description}</p>

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

          <section id="common-early-mistakes" className="mt-10">
            <h2 className="text-2xl font-bold text-amber-50">Common Early Mistakes</h2>
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

          <nav className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Guide navigation">
            {navigation.previous ? (
              <ContentCard
                item={{
                  ...navigation.previous,
                  meta: "Previous Guide",
                }}
              />
            ) : null}
            {navigation.next ? (
              <ContentCard
                item={{
                  ...navigation.next,
                  meta: "Next Guide",
                }}
              />
            ) : null}
          </nav>

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
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={toc} />
          <InfoTable
            rows={[
              { label: "Category", value: guide.category },
              { label: "Updated", value: guide.updatedAt },
              { label: "Reading Time", value: guide.readingTime },
              { label: "Content Type", value: "Guide" },
            ]}
          />
        </aside>
      </article>
    </main>
  );
}
