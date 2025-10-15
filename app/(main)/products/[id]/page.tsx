export const revalidate = 60;

import Image from "next/image";
import { Parameter, Product } from "../../../lib/schemas";
import { Metadata } from "next";
import PriceBlock from "@/app/components/Shared/PriceBlock";
import Slider from "@/app/components/Shared/Slider";
import { CircleSmall } from "lucide-react";
import ParamterValueShow from "@/app/components/Shared/ParamterValueShow";

export async function generateStaticParams() {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products`);
  const products: Product[] = await productsRes.json();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const productRes = await fetch(`${process.env.BACKEND_URL}/products/${id}`);
  const product: Product = await productRes.json();
  return {
    title: product?.name,
    description: product?.description,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productRes = await fetch(`${process.env.BACKEND_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
  const product: Product = await productRes.json();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* LEFT SIDE (image/slider) */}
      <div className="flex flex-col items-center">
        {product?.imageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${product?.imageUrl}`}
            alt={product?.name || ""}
            width={400}
            height={300}
            className="p-4"
          />
        )}

        {product?.images?.length > 0 && (
          <div className="w-full max-w-md mt-4">
            <Slider images={product.images} />
          </div>
        )}
      </div>

      {/* RIGHT SIDE (name, brand, params, price) */}
      <div className="flex flex-col justify-start px-4">
        <h1 className="font-extrabold text-2xl my-4">{product?.name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <CircleSmall fill="true" size={12} />
          <div className="flex items-center gap-2">
            <div>برند:</div>
            <div>{product?.brandName}</div>
          </div>
        </div>

        {product?.parameters?.map((parameter: Parameter) => (
          <div
            key={parameter.id}
            className="grid grid-cols-1 md:grid-cols-2  items-start leading-8 gap-2 mb-2"
          >
            <ParamterValueShow parameter={parameter} product={product} />
          </div>
        ))}

        <div className="mt-6 font-extrabold text-xl">
          {product?.generated ? (
            <PriceBlock price={product?.main_product?.price2} />
          ) : (
            <PriceBlock price={product?.price} />
          )}
        </div>
        <div id="description" className=" py-2 my-4 font-bold text-red-500">
          یک سال گارانتی و ۴ سال خدمات پس از فروش
        </div>
      </div>

      {/* DESCRIPTION (FULL WIDTH BELOW) */}
      <div className="sm:col-span-2 mt-6 px-8 text-gray-700 leading-8 [&_li]:list-disc">
        <div
          dangerouslySetInnerHTML={{
            __html: product?.generated
              ? (product?.main_product?.description ?? "")
              : (product?.description ?? ""),
          }}
        />
      </div>
    </div>
  );
};

export default page;
