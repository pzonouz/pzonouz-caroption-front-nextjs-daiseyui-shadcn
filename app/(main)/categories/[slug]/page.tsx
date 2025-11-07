export const revalidate = 60;

import { Metadata } from "next";
import ProductCard from "../../../components/Products/ProductCard";
import { Article, Category, Product } from "../../../lib/schemas";
import ArticleCard from "@/app/components/Articles/ArticleCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`);
  const categories: Category[] = await categoriesRes.json();
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryRes = await fetch(
    `${process.env.BACKEND_URL}/category_by_slug/search?q=${encodeURIComponent(slug)}`,
  );
  if (!categoryRes.ok) {
    // Show 404 page on 400 or 500 errors
    if (categoryRes.status === 400 || categoryRes.status === 500) {
      notFound();
    }
  }
  const category: Category = await categoryRes.json();
  return {
    title: category?.name,
    description: category?.description,
  };
}
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const categoryRes = await fetch(
    `${process.env.BACKEND_URL}/category_by_slug/search?q=${encodeURIComponent(slug)}`,
  );
  if (!categoryRes.ok) {
    // Show 404 page on 400 or 500 errors
    if (categoryRes.status === 400 || categoryRes.status === 500) {
      notFound();
    }
  }
  const category = await categoryRes.json();
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/products_in_category/${category.id}`,
  );
  if (!productsRes.ok) {
    // Show 404 page on 400 or 500 errors
    if (productsRes.status === 400 || categoryRes.status === 500) {
      notFound();
    }
  }
  const products: Product[] = (await productsRes.json()) ?? [];
  const articlesRes = await fetch(
    `${process.env.BACKEND_URL}/articles_in_category/${category.id}`,
  );
  if (!articlesRes.ok) {
    // Show 404 page on 400 or 500 errors
    if (articlesRes.status === 400 || categoryRes.status === 500) {
      notFound();
    }
  }
  const articles: Article[] = await articlesRes.json();
  const allowedArticles = articles?.filter(
    (article) => article?.showInProducts,
  );
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-14 md:mt-24">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {allowedArticles?.map((article: Article) => (
          <ArticleCard key={article?.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default page;
