"use client";
import { columns } from "@/app/components/Categories/Columns";
import { CreateCategory } from "@/app/components/Categories/CreateCategory";
import { DataTable } from "@/app/components/Shared/DataTable";
import {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";

const Page = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: parentCategories } = useGetParentCategoriesQuery();

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      {!parentCategories ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <CreateCategory categories={parentCategories} />
      )}
      {!categories ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          filterColumns={[{ title: "نام", column: "name" }]}
        />
      )}
    </div>
  );
};

export default Page;
