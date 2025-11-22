import { Metadata } from "next";
import Blocks from "../components/Navigation/Blocks";
import { RecentlyAddedProducts } from "../components/Products/RecentlyAddedProducts";
import { CategoryBasedProducts } from "../components/Products/CategoryBasedProducts";
import { RecentlyAddedArticles } from "../components/Articles/RecentlyAddedArticles";
import FirstLevelEntities from "../components/Entities/FirstLevelEntities";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  return (
    <div className="mb-8">
      <Blocks />
      {/* <FirstLevelEntities /> */}
      <RecentlyAddedProducts />
      <RecentlyAddedArticles />
      <CategoryBasedProducts />
    </div>
  );
};

export default page;
