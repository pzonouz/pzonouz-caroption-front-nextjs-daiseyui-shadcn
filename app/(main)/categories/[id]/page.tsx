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
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const categoryRes = await fetch(
    `${process.env.BACKEND_URL}/categories/${id}`,
  );
  const category: Category = await categoryRes.json();
  return {
    title: category?.name,
    description: category?.description,
  };
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/products_in_category/${id}`,
  );
  const products: Product[] = (await productsRes.json()) ?? [];
  return (
    <div>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;
