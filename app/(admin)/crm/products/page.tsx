"use client";
import { columns } from "@/app/components/Products/Columns";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetProductsQuery } from "@/app/lib/features/api";

const Page = () => {
  const { data: products } = useGetProductsQuery();
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateProduct />
      {products ? (
        <DataTable
          filterColumns={[{ title: "نام", column: "name" }]}
          columns={columns}
          data={products}
        />
      ) : (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      )}
    </div>
  );
};

export default Page;
