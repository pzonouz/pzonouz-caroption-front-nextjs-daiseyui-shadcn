"use server";
import Link from "next/link";
import Image from "next/image";
import { Category } from "../../lib/schemas";

const Blocks = async () => {
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
    {
      cache: "no-store",
    },
  );
  const categories: Category[] = await categoriesRes.json();
  const showigCategories = categories.filter((c: Category) => c.show);
  return (
    <div className=" grid grid-cols-3 gap-y-4 sm:grid-cols-5 p-4">
      {showigCategories.map((category) => (
        <div className="rounded-2xl border-gray-500" key={category?.id}>
          <Link
            href={`/categories/${category?.slug}`}
            className="flex flex-col items-center"
          >
            <Image
              src={
                category?.imageUrl
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${category.imageUrl}`
                  : "/images/logo.jpg"
              }
              width={50}
              height={50}
              alt={category.name}
              className=" sm:hidden"
            />
            <Image
              src={
                category?.imageUrl
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${category.imageUrl}`
                  : "/images/logo.jpg"
              }
              width={100}
              height={100}
              alt={category.name}
              className="hidden sm:block"
            />
            <p className="text-sm">{category?.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blocks;
