"use client";

import { columns } from "@/app/components/Persons/Columns";
import { CreatePerson } from "@/app/components/Persons/CreatePerson";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetPersonsQuery } from "@/app/lib/features/api";
import { useAppSelector } from "@/app/lib/hooks";

const Page = () => {
  const access = useAppSelector((state) => state?.access?.access);
  const { data: persons } = useGetPersonsQuery(undefined, {
    skip: !access,
  });
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreatePerson />
      {!persons ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <DataTable
          columns={columns}
          data={persons}
          filterColumns={[
            { title: "تلفن", column: "phone" },
            { title: "نام خانوادگی", column: "lastname" },
          ]}
        />
      )}
    </div>
  );
};

export default Page;
