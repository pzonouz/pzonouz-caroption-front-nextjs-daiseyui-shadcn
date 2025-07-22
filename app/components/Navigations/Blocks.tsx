"use server";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/app/lib/types";

const Blocks = async () => {
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
  );
  const categories: Category[] = await categoriesRes.json();
  return (
    <div className=" grid grid-cols-3 gap-2 sm:grid-cols-4 p-4">
      {categories.map((category) => (
        <div className="rounded-2xl border-gray-500" key={category?.id}>
          <Link
            href={`/categories/${category.id}`}
            className="flex flex-col items-center"
          >
            <Image
              src={
                category?.image_url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.image_url}`
                  : "/images/logo.jpg"
              }
              width={50}
              height={50}
              alt={category.name}
            />
            <p className="text-sm">{category?.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blocks;
