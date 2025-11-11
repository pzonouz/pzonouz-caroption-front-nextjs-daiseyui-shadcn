import { ProductCarousel } from "./ProductCarousel";

const RecentlyAddedProducts = async () => {
  const productsRes = await fetch(
    `${process.env.BACKEND_URL}/recently_added_products`,
    {
      next: { revalidate: 60 },
    },
  );
  const products = await productsRes.json();

  return (
    <div className="bg-teal-600 p-6 mt-6">
      <div className="font-bold text-white mb-5">جدیدترین محصولات</div>
      <ProductCarousel products={products} />
    </div>
  );
};
export { RecentlyAddedProducts };
