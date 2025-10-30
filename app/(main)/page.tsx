import { Metadata } from "next";
import Blocks from "../components/Navigations/Blocks";
import { Product } from "../lib/schemas";
import { Products } from "../components/Products/Products";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`);
  const products: Product[] = await productsRes.json();
  const showProducts = products.filter((p) => p.show);
  return (
    <div>
      <Blocks />
      <Products products={showProducts} />
    </div>
  );
};

export default page;
