"use server";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../lib/schemas";
import { headers } from "next/headers";
import { getBackendUrl } from "@/app/lib/utils";

const ProductCard = async ({ product }: { product: Product }) => {
  const h = await headers();
  const backendUrl = await getBackendUrl(h);
  return (
    <Link
      href={`/products/${product?.id}`}
      className="flex flex-row gap-3 items-center p-2 mt-2"
    >
      <Image
        src={
          product.image_url
            ? `${backendUrl}/${product?.image_url}`
            : "/images/logo.jpg"
        }
        alt={product.name}
        width={800}
        height={800}
        className="w-1/3"
      />
      <div>
        <div>{product.name}</div>
        <div className="text-xs text-gray-500">{product.info}</div>
        <div>{product.price}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
