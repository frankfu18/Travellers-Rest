import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard } from "@/components/content-card";
import { Faq } from "@/components/faq";
import { InfoTable } from "@/components/info-table";
import { JsonLd } from "@/components/json-ld";
import { TableOfContents } from "@/components/table-of-contents";
import { guides } from "@/data/guides";
import { getGuide, getRelatedGuides } from "@/lib/content";
import { articleSchema, breadcrumbSchema, createMetadata } from "@/lib/seo";

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
    title: `${guide.title} - Travellers Rest Guide`,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
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
  const toc = [...guide.sections.map((section) => ({ id: section.id, title: section.title })), { id: "faq-heading", title: "FAQ" }];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <JsonLd
        data={[
          articleSchema({
            title: `${guide.title} - Travellers Rest Guide`,
            description: guide.description,
            path,
            dateModified: guide.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]),
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
              <p className="mt-3 text-stone-300">{section.body}</p>
            </section>
          ))}

          <div className="mt-10">
            <Faq items={guide.faq} />
          </div>

          <section className="mt-10" aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading" className="text-2xl font-bold text-amber-50">
              Related Guides
            </h2>
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
