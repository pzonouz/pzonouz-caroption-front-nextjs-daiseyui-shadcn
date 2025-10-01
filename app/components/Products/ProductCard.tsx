"use server";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/schemas";
import { formatStringToCommaSeparatedNumber } from "@/app/lib/utils";
import ImagesManager from "../Shared/ImageManager";

const ProductCard = async ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/products/${product?.id}`}
      className="flex flex-row gap-3 items-center p-2 mt-2"
    >
      <Image
        src={
          product.image_url
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${product?.image_url}`
            : "/images/logo.jpg"
        }
        alt={product.name}
        width={800}
        height={800}
        className="w-1/3"
      />
      <div>
        <div>{product.name}</div>
        <div className="text-xs text-gray-500">
          {product?.generated ? product?.main_product?.info : product?.info}
        </div>
        <div className="flex flex-row gap-1 text-emerald-500">
          <div>
            {product?.generated
              ? formatStringToCommaSeparatedNumber(product?.price2)
              : formatStringToCommaSeparatedNumber(product?.price)}
          </div>
          <div>تومان</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
