"use client";
import { columns } from "@/app/components/Parameters/Columns";
import { CreateParameter } from "@/app/components/Parameters/CreateParameter";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetParametersQuery } from "@/app/lib/features/api";

const Page = () => {
  const { data: parameters } = useGetParametersQuery();
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateParameter />
      {parameters ? (
        <DataTable
          filterColumns={[{ title: "نام", column: "name" }]}
          columns={columns}
          data={parameters}
        />
      ) : (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      )}
    </div>
  );
};

export default Page;
