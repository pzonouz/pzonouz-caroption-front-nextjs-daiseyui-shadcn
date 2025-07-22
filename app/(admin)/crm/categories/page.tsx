"use client";
import { DataTable } from "@/app/components/Categories/CategoriesList";
import { columns } from "@/app/components/Categories/Columns";
import { CreateCategory } from "@/app/components/Categories/CreateCategory";
import {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";

const Page = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: parentCategories } = useGetParentCategoriesQuery();

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateCategory categories={parentCategories} />
      {!categories ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <DataTable columns={columns} data={categories} />
      )}
    </div>
  );
};

export default Page;
