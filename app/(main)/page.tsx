import { Metadata } from "next";
import Blocks from "../components/Navigation/Blocks";
import { RecentlyAddedProducts } from "../components/Products/RecentlyAddedProducts";
import { CategoryBasedProducts } from "../components/Products/CategoryBasedProducts";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  return (
    <div className="mb-8">
      <Blocks />
      <RecentlyAddedProducts />
      {/* <CategoryBasedProducts /> */}
    </div>
  );
};

export default page;
