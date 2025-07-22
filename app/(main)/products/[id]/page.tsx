import { Product } from "@/app/lib/types";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productRes = await fetch(`${process.env.BACKEND_URL}/products/${id}/`);
  const product: Product = await productRes.json();
  return (
    <div>
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product?.image_url}`}
        alt={`${product?.name}`}
        width={400}
        height={400}
      />
      <h1 className="font-bold px-4">{product?.name}</h1>
      <div
        className="mt-4 [&_li]:list-disc px-6"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      ></div>
      <div className="px-4 font-bold" style={{ color: "red" }}>
        این محصول کاملا اورجینال میباشد و دارای ضمانت و اصالت کالا می باشد
      </div>
    </div>
  );
};

export default page;
