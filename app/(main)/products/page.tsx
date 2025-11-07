import { Products } from "@/app/components/Products/Products";
import { Product } from "@/app/lib/schemas";
import { notFound } from "next/navigation";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!productsRes.ok) {
    // Show 404 page on 400 or 500 errors
    if (productsRes.status === 400 || productsRes.status === 500) {
      notFound();
    }
  }
  const products: Product[] = await productsRes.json();
  return (
    <div className="">
      <Products products={products} />
    </div>
  );
};
export default page;
