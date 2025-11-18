import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCarousel } from "./ProductCarousel";
import Link from "next/link";

const RecentlyAddedProducts = async () => {
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/recently_added_products`,
    {
      next: { revalidate: 60 },
    }
  );
  const products = await productsRes.json();

  return (
    <div className="bg-gray-600  mt-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-white p-5">جدیدترین محصولات</div>
        <Link href={"/recently_added_products"} className="text-white flex ">
          <div>مشاهده همه</div>
          <ChevronLeft />
        </Link>
      </div>
      <ProductCarousel products={products} className="p-2" />
    </div>
  );
};
export { RecentlyAddedProducts };
