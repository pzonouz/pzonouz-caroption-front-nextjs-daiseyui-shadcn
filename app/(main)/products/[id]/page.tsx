export const revalidate = 60;

import Image from "next/image";
import { Parameter, Product } from "../../../lib/schemas";
import { Metadata } from "next";
import PriceBlock from "@/app/components/Shared/PriceBlock";
import Slider from "@/app/components/Shared/Slider";
import { CircleSmall } from "lucide-react";
import ParamterValueShow from "@/app/components/Shared/ParamterValueShow";

export async function generateStaticParams() {
  const productsRes = await fetch(`${process.env.BACKEND_URL}/products/`);
  const products: Product[] = await productsRes.json();
  return products.map((category) => ({
    id: category.id.toString(),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const productRes = await fetch(`${process.env.BACKEND_URL}/products/${id}/`);
  const product: Product = await productRes.json();
  return {
    title: product?.name,
    description: product?.description,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productRes = await fetch(`${process.env.BACKEND_URL}/products/${id}/`);
  const product: Product = await productRes.json();
  return (
    <div>
      {product?.image_url && (
        <div className="grid place-items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.image_url}`}
            alt={`${product?.name}`}
            width={400}
            height={300}
            className="p-4"
          />
        </div>
      )}
      <h1 className="font-extrabold px-4">{product?.name}</h1>
      {product?.image_urls?.length > 0 && (
        <Slider items={product?.image_urls} />
      )}
      <div className="flex flex-row items-center gap-2 pr-8">
        <CircleSmall fill="true" size={12} />
        <div className="flex flex-row items-center gap-2">
          <div>برند:</div>
          <div>{product?.brand_full?.name}</div>
        </div>
      </div>
      {product?.category_full?.parameter_groups?.[0]?.parameters?.map(
        (parameter: Parameter) => (
          <div
            key={parameter?.id}
            className="flex flex-col items-start pr-8 leading-8 gap-2"
          >
            <ParamterValueShow parameter={parameter} product={product} />
          </div>
        ),
      )}
      {product?.generated ? (
        <div
          className="mt-4 [&_li]:list-disc px-8 text-gray-700 leading-8"
          dangerouslySetInnerHTML={{
            __html: product?.main_product?.description ?? "",
          }}
        ></div>
      ) : (
        <div
          className="mt-4 [&_li]:list-disc px-8 text-gray-700 leading-8"
          dangerouslySetInnerHTML={{
            __html: product?.description ?? "",
          }}
        ></div>
      )}
      <div className="px-4 py-4 font-bold" style={{ color: "red" }}>
        یک سال گارانتی و ۴ سال خدمات پس از فروش
      </div>
      <div className="px-6 mb-6 font-extrabold text-xl">
        {product?.generated ? (
          <PriceBlock price={product?.main_product?.price2} />
        ) : (
          <PriceBlock price={product?.price} />
        )}
      </div>
    </div>
  );
};

export default page;
