export const revalidate = 60;

import { Metadata } from "next";
import ProductCard from "../../../components/Products/ProductCard";
import { Article, Category, Product } from "../../../lib/schemas";
import ArticleCard from "@/app/components/Articles/ArticleCard";
import { notFound } from "next/navigation";

// --- Generate static params for all categories ---
export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/categories`, {
    cache: "force-cache", // ensures build-time fetching
  });

  if (!res.ok) return [];

  const categories: Category[] = await res.json();

  // must return [{ slug: "something" }, ...]
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// --- Generate metadata for each category ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${
        process.env.BACKEND_URL
      }/category_by_slug/search?q=${encodeURIComponent(slug)}`,
      { cache: "force-cache" } // build-time fetch
    );

    if (!res.ok) throw new Error("Category not found");

    const category: Category = await res.json();

    return {
      title: category?.name || "دسته‌بندی یافت نشد",
      description: category?.description || "",
    };
  } catch {
    return {
      title: "دسته‌بندی یافت نشد",
      description: "",
      robots: { index: false, follow: false },
    };
  }
}

// --- Category Page Component (SSG) ---
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let category: Category | null = null;
  let products: Product[] = [];
  let articles: Article[] = [];

  // --- Fetch category ---
  try {
    const categoryRes = await fetch(
      `${
        process.env.BACKEND_URL
      }/category_by_slug/search?q=${encodeURIComponent(slug)}`,
      { cache: "force-cache" } // SSG build-time fetch
    );

    if (!categoryRes.ok) notFound();

    category = await categoryRes.json();
    if (!category?.id) notFound();
  } catch {
    notFound();
  }

  // --- Fetch products in category ---
  try {
    const productsRes = await fetch(
      `${process.env.BACKEND_URL}/products_in_category/${category.id}`,
      { next: { revalidate: 60 } } // incremental revalidation
    );
    if (productsRes.ok) {
      products = (await productsRes.json()) ?? [];
      products = products.filter((p) => p?.show);
    }
  } catch {
    // silent fail
  }

  // --- Fetch articles in category ---
  try {
    const articlesRes = await fetch(
      `${process.env.BACKEND_URL}/articles_in_category/${category.id}`,
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
        {category?.name}
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
