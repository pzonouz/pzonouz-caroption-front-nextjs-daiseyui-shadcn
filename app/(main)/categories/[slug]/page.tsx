export const revalidate = 60;

import { Metadata } from "next";
import ProductCard from "../../../components/Products/ProductCard";
import { Category, Product } from "../../../lib/schemas";

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
  const category = await categoryRes.json();
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/products_in_category/${category.id}`,
  );
  const products: Product[] = (await productsRes.json()) ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-14 md:mt-24">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;
