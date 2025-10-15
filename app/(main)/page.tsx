import { Metadata } from "next";
import Blocks from "../components/Navigations/Blocks";
import ProductCard from "../components/Products/ProductCard";
import { Product } from "../lib/schemas";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`);
  const products: Product[] = await productsRes.json();
  return (
    <div>
      <Blocks />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-14 md:mt-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
