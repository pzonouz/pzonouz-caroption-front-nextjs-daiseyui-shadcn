"use client";

import { columns } from "@/app/components/Persons/Columns";
import { CreatePerson } from "@/app/components/Persons/CreatePerson";
import { DataTable } from "@/app/components/Persons/PersonsList";
import { useGetPersonsQuery } from "@/app/lib/features/api";
import { useAppSelector } from "@/app/lib/hooks";
import { useEffect, useRef } from "react";

const Page = () => {
  const access = useAppSelector((state) => state?.access?.access);
  const { data: persons, refetch } = useGetPersonsQuery();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (access != "" && !hasFetched.current) {
      refetch();
      hasFetched.current = true;
    }
  }, [access]);
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreatePerson />
      {!persons ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <DataTable columns={columns} data={persons} />
      )}
    </div>
  );
};

export default Page;
