"use server";
import Blocks from "../components/Navigations/Blocks";
import ProductCard from "../components/Products/ProductCard";
import { Product } from "../lib/types";

const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products/`);
  const products: Product[] = await productsRes.json();
  return (
    <div>
      <Blocks />
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
