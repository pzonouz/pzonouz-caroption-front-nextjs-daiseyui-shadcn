import ProductCard from "@/app/components/Products/ProductCard";
import { Product } from "@/app/lib/types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/products_in_category/${id}`,
  );
  const products: Product[] = await productsRes.json();
  return (
    <div>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;
