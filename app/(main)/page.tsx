import { Metadata } from "next";
import Blocks from "../components/Navigations/Blocks";
import ProductCard from "../components/Products/ProductCard";
import { Product } from "../lib/schemas";
import { headers } from "next/headers";
import { getBackendUrl } from "../lib/utils";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  const h = await headers();
  const backendUrl = await getBackendUrl(h);
  const productsRes = await fetch(`${backendUrl}/products/`);
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
