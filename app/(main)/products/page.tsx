import { Products } from "@/app/components/Products/Products";
import { Product } from "@/app/lib/schemas";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`, {
    next: { revalidate: 60 },
  });
  const products: Product[] = await productsRes.json();
  return (
    <div>
      <Products products={products} />
    </div>
  );
};
export default page;
