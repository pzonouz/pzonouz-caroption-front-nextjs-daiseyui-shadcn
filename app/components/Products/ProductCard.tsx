import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/schemas";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/products/${product?.slug}`}
      className=" flex flex-col gap-3 items-center  mt-2 border-gray-500 bg-white border-solid border-[1px] rounded-md relative "
    >
      <div
        className="w-full h-full absolute top-0 right-0 bg-gray-800/0 hover:bg-gray-800/10 transition-colors duration-300"
        id="overlay"
      ></div>
      <Image
        src={
          product.imageUrl
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${product?.imageUrl}`
            : "/images/logo.jpg"
        }
        alt={product.name}
        width={400}
        height={400}
        className="w-full p-0.5"
      />
      <div className="flex flex-col items-center px-6 pb-4">
        <div className="text-sm font-bold h-12">{product.name}</div>
        <div className="flex flex-row gap-1 text-emerald-500 text-xs font-bold">
          قیمت: تماس بگیرید
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
