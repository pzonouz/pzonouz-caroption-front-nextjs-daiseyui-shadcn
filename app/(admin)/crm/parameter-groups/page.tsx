"use client";

import { columns } from "@/app/components/ParameterGroups/Columns";
import { CreateParameterGroup } from "@/app/components/ParameterGroups/CreateParameterGroup";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetParameterGroupsQuery } from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state?.access?.access);
  const { data: parameterGroups, isFetching } = useGetParameterGroupsQuery(
    undefined,
    {
      skip: !access,
    },
  );
  useEffect(() => {
    if (isFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isFetching, dispatch]);
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateParameterGroup />
      <DataTable
        columns={columns}
        data={parameterGroups ? parameterGroups : []}
        filterColumns={[{ title: "نام", column: "name" }]}
      />
    </div>
  );
};

export default Page;
