import { Metadata } from "next";
import Blocks from "../components/Navigation/Blocks";
import { RecentlyAddedProducts } from "../components/Products/RecentlyAddedProducts";

export const metadata: Metadata = {
  title: "خانه",
};
const page = async () => {
  return (
    <div>
      <Blocks />
      <RecentlyAddedProducts />
    </div>
  );
};

export default page;
