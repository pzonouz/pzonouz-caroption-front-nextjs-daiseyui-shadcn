import { Products } from "@/app/components/Products/Products";
import { Category } from "@/app/lib/schemas";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`);
  const products: Category[] = await productsRes.json();
  return (
    <div>
      <Products products={products} />
    </div>
  );
};
export default page;
