import { Product } from "@/app/lib/schemas";
import ProductCard from "./ProductCard";

const Products = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:mt-14 md:mt-24 gap-3">
    {products?.map((product: Product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
export { Products };
