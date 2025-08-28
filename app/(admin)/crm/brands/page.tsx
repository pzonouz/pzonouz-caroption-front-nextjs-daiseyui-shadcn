"use client";

import { columns } from "@/app/components/Brands/Columns";
import { CreateBrand } from "@/app/components/Brands/CreateBrand";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetBrandsQuery } from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state?.access?.access);
  const { data: brands, isFetching } = useGetBrandsQuery(undefined, {
    skip: !access,
  });
  useEffect(() => {
    if (isFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isFetching, dispatch]);
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateBrand />
      <DataTable
        columns={columns}
        data={brands ? brands : []}
        filterColumns={[{ title: "نام", column: "name" }]}
      />
    </div>
  );
};

export default Page;
