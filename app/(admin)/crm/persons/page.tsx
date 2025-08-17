"use client";

import { columns } from "@/app/components/Persons/Columns";
import { CreatePerson } from "@/app/components/Persons/CreatePerson";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetPersonsQuery } from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state?.access?.access);
  const { data: persons, isFetching } = useGetPersonsQuery(undefined, {
    skip: !access,
  });
  useEffect(() => {
    if (isFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isFetching]);
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreatePerson />
      <DataTable
        columns={columns}
        data={persons ? persons : []}
        filterColumns={[
          { title: "تلفن", column: "phone" },
          { title: "نام خانوادگی", column: "lastname" },
        ]}
      />
    </div>
  );
};

export default Page;
