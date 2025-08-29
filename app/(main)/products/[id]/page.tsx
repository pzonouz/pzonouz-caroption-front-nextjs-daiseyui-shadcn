export const revalidate = 60;

import Image from "next/image";
import { Product } from "../../../lib/schemas";
import { Metadata } from "next";

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
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.image_url}`}
          alt={`${product?.name}`}
          width={400}
          height={400}
        />
      )}
      <h1 className="font-bold px-4">{product?.name}</h1>
      {product?.generated ? (
        <div
          className="mt-4 [&_li]:list-disc px-6"
          dangerouslySetInnerHTML={{
            __html: product?.main_product?.description ?? "",
          }}
        ></div>
      ) : (
        <div
          className="mt-4 [&_li]:list-disc px-6"
          dangerouslySetInnerHTML={{
            __html: product?.description ?? "",
          }}
        ></div>
      )}
      <div className="px-4 font-bold" style={{ color: "red" }}>
        این محصول کاملا اورجینال میباشد و دارای ضمانت و اصالت کالا می باشد
      </div>
    </div>
  );
};

export default page;
