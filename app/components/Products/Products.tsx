import { Product } from "@/app/lib/schemas";
import ProductCard from "./ProductCard";

const Products = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-14 md:mt-24">
    {products?.map((product: Product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
export { Products };
