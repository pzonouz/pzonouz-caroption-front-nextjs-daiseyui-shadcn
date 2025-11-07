const revalidate = 60;
import Image from "next/image";
import { Metadata } from "next";
import { Parameter, Product } from "../../../lib/schemas";
import PriceBlock from "@/app/components/Shared/PriceBlock";
import Slider from "@/app/components/Shared/Slider";
import ParamterValueShow from "@/app/components/Shared/ParamterValueShow";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/products`);
  const products: Product[] = await res.json();
  return products.map((product) => ({ slug: product?.slug?.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/product_by_slug/search?q=${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Product not found");

    const product: Product = await res.json();

    if (!product?.show) {
      return {
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: product?.name,
      description: product?.description,
      keywords: ["اردبیل", ...(product?.keywords ?? [])],
    };
  } catch {
    return {
      title: "محصول یافت نشد",
      robots: { index: false, follow: false },
    };
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let product: Product | null = null;

  try {
    const productRes = await fetch(
      `${process.env.BACKEND_URL}/product_by_slug/search?q=${encodeURIComponent(slug)}`,
      {
        next: { revalidate },
      },
    );

    if (!productRes.ok) {
      // Backend error (e.g. 500 or 404) → go to 404
      notFound();
    }

    product = await productRes.json();

    if (!product?.id) {
      // Invalid JSON or empty response → go to 404
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-extrabold text-center my-6">
        {product?.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center">
          {product?.imageUrl && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${product.imageUrl}`}
              alt={product?.name || ""}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}

          <div className="mt-6 font-extrabold text-xl">
            <PriceBlock
              price={
                product?.generated
                  ? product?.main_product?.price2
                  : product?.price
              }
            />
          </div>

          <div className="py-2 my-4 font-bold text-red-500">
            یک سال گارانتی و ۴ سال خدمات پس از فروش
          </div>

          {product?.images?.length > 0 && (
            <div className="w-full max-w-md mt-4">
              <Slider images={product.images} />
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-start px-2 sm:px-4 text-right">
          <div className="mb-6">
            <div className="flex justify-between items-center border-b-2 border-b-gray-600 py-2">
              <span className="font-medium">برند</span>
              <span>{product?.brandName}</span>
            </div>
          </div>

          <div className="grid gap-2">
            {product?.parameters?.map((parameter: Parameter) => (
              <ParamterValueShow
                key={parameter.id}
                parameter={parameter}
                product={product}
              />
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="sm:col-span-2 mt-8 px-2 sm:px-8 text-gray-700 leading-8 text-right">
          <div
            dangerouslySetInnerHTML={{
              __html: product?.generated
                ? (product?.main_product?.description ?? "")
                : (product?.description ?? ""),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
