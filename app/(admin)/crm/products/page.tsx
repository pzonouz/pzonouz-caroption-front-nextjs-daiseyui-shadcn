"use client";
import { columns } from "@/app/components/Products/Columns";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { DataTable } from "@/app/components/Products/ProductsList";
import {
  useGetParentCategoriesQuery,
  useGetProductsQuery,
} from "@/app/lib/features/api";

const Page = () => {
  const { data: products } = useGetProductsQuery();
  const { data: parentCategories } = useGetParentCategoriesQuery();
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      {parentCategories && (
        <CreateProduct parentCategories={parentCategories} />
      )}
      {products && parentCategories ? (
        <DataTable columns={columns} data={products} />
      ) : (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      )}
    </div>
  );
};

export default Page;
