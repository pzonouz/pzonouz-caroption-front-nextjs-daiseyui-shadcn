export const revalidate = 60;

import { Metadata } from "next";
import { Article } from "../../../lib/schemas";
import { notFound } from "next/navigation";

// --- Generate static params for SSG ---
export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/articles`, {
    cache: "force-cache", // ensures build-time fetching
  });

  if (!res.ok) return [];

  const articles: Article[] = await res.json();

  return articles.map((article) => ({
    slug: article.slug?.toString(),
  }));
}

// --- Generate metadata for each article ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/article_by_slug/search?q=${encodeURIComponent(
        slug
      )}`,
      { cache: "force-cache" } // build-time fetch
    );

    if (!res.ok) throw new Error("Article not found");

    const article: Article = await res.json();

    return {
      title: article?.name || "مقاله یافت نشد",
      description: article?.description || "",
    };
  } catch {
    return {
      title: "مقاله یافت نشد",
      description: "",
      robots: { index: false, follow: false },
    };
  }
}

// --- Article Page Component (SSG + ISR) ---
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let article: Article | null = null;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/article_by_slug/search?q=${encodeURIComponent(
        slug
      )}`,
      { next: { revalidate: 60 } } // incremental revalidation
    );

    if (!res.ok) notFound();

    article = await res.json();
    if (!article?.id) notFound();
  } catch {
    notFound();
  }

  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.BASE_URL}/articles/${article?.slug}`}
        key="canonical"
      />
      <div className="article h-dvh px-4 py-8">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          {article?.name}
        </h1>

        <div
          className="description leading-8 text-gray-800 text-right"
          dangerouslySetInnerHTML={{
            __html: article?.description ?? "",
          }}
        />
      </div>
    </>
  );
};

export default Page;
