import { Metadata } from "next";
import Blocks from "../components/Navigation/Blocks";
import { RecentlyAddedProducts } from "../components/Products/RecentlyAddedProducts";
import { CategoryBasedProducts } from "../components/Products/CategoryBasedProducts";
import { RecentlyAddedArticles } from "../components/Articles/RecentlyAddedAtricles";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  return (
    <div className="mb-8">
      <Blocks />
      <RecentlyAddedProducts />
      <RecentlyAddedArticles />
      <CategoryBasedProducts />
    </div>
  );
};

export default page;
