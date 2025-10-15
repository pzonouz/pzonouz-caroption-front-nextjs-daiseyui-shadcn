export const revalidate = 60;

import type { MetadataRoute } from "next";
import { Category, Product } from "./lib/schemas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products/`);
  if (!productsRes.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await productsRes.json();
  const productsEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${process.env.BACKEND_URL}/products/${product?.id}/`,
    lastModified: `${product?.updatedAt}`,
  }));
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories/`);
  if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
  const categories: Category[] = await categoriesRes.json();
  const categoriesEntries: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${process.env.BACKEND_URL}/categories/${category?.id}/`,
      lastModified: `${category?.updatedAt}`,
    }),
  );

  return [
    {
      url: `${process.env.BACKEND_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productsEntries,
    ...categoriesEntries,
  ];
}
