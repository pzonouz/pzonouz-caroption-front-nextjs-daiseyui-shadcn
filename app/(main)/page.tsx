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
  return (
    <div>
      <Blocks />
      <Products products={products} />
    </div>
  );
};

export default page;
