"use client";

import { columns } from "@/app/components/Parameters/Columns";
import { CreateParameter } from "@/app/components/Parameters/CreateParameter";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetParametersQuery } from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state?.access?.access);
  const { data: parameters, isFetching } = useGetParametersQuery(undefined, {
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
      <CreateParameter />
      <DataTable
        columns={columns}
        data={parameters ? parameters : []}
        filterColumns={[{ title: "نام", column: "name" }]}
      />
    </div>
  );
};

export default Page;
