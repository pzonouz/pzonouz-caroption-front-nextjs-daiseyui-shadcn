export const revalidate = 60;

import { Metadata } from "next";
import ProductCard from "../../../components/Products/ProductCard";
import { Article, Entity, Product } from "../../../lib/schemas";
import ArticleCard from "@/app/components/Articles/ArticleCard";
import { notFound } from "next/navigation";

// --- Generate static params for all entities ---
export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/entities`, {
    cache: "force-cache", // ensures build-time fetching
  });

  if (!res.ok) return [];
  const entities: Entity[] = await res.json();

  // must return [{ entitySlug: "something" }, ...]
  return entities.map((entity) => ({
    slug: entity.entitySlug,
  }));
}

// --- Generate metadata for each entity ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/entity_by_slug/search?q=${encodeURIComponent(
        slug
      )}`,
      { cache: "force-cache" } // build-time fetch
    );
    if (!res.ok) throw new Error("Entity not found");

    const entity: Entity = await res.json();
    return {
      title: entity?.name || "دسته‌بندی یافت نشد",
      description: entity?.description || "",
    };
  } catch {
    return {
      title: "دسته‌بندی یافت نشد",
      description: "",
      robots: { index: false, follow: false },
    };
  }
}

// --- Entity Page Component (SSG) ---
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let entity: Entity | null = null;
  let products: Product[] = [];
  let articles: Article[] = [];

  // --- Fetch entity ---
  try {
    const entityRes = await fetch(
      `${process.env.BACKEND_URL}/entity_by_slug/search?q=${encodeURIComponent(
        slug
      )}`,
      { cache: "force-cache" } // SSG build-time fetch
    );

    if (!entityRes.ok) notFound();

    entity = await entityRes.json();
    if (!entity?.id) notFound();
  } catch {
    notFound();
  }

  // --- Fetch products in entity ---
  try {
    const productsRes = await fetch(
      `${process.env.BACKEND_URL}/products_in_entity/${entity.id}`,
      { next: { revalidate: 60 } } // incremental revalidation
    );

    if (productsRes.ok) {
      products = (await productsRes.json()) ?? [];
      products = products.filter((p) => p?.show);
    }
  } catch {
    // silent fail
  }

  // --- Fetch articles in entity ---
  try {
    const articlesRes = await fetch(
      `${process.env.BACKEND_URL}/articles_in_entity/${entity.id}`,
      { next: { revalidate: 60 } }
    );

    if (articlesRes.ok) {
      articles = (await articlesRes.json()) ?? [];
    }
  } catch {
    // silent fail
  }

  const allowedArticles = articles?.filter(
    (article) => article?.showInProducts
  );

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-extrabold text-center mb-8">
        {entity?.name}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:mt-14 md:mt-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {allowedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}

        {products.length === 0 && allowedArticles.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            محصول یا مقاله‌ای در این دسته‌بندی یافت نشد.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
