export const revalidate = 60;

import type { MetadataRoute } from "next";
import { Article, Category, Product } from "./lib/schemas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products/`);
  if (!productsRes.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await productsRes.json();
  const productsEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product?.slug}/`,
    lastModified: `${product?.updatedAt}`,
  }));
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories/`);
  if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
  const categories: Category[] = await categoriesRes.json();
  const categoriesEntries: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category?.slug}/`,
      lastModified: `${category?.updatedAt}`,
    }),
  );
  const articlesRes = await fetch(`${process.env.BACKEND_URL}/articles/`);
  if (!articlesRes.ok) throw new Error("Failed to fetch articles");
  const articles: Article[] = await articlesRes.json();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article?.slug}/`,
    lastModified: `${article?.updatedAt}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productsEntries,
    ...categoriesEntries,
    ...articleEntries,
  ];
}
