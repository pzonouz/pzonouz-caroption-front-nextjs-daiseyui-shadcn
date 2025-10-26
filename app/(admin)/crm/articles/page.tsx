"use client";
import { columns } from "@/app/components/Articles/Columns";
import { CreateArticle } from "@/app/components/Articles/CreateArticle";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetArticlesQuery } from "@/app/lib/features/api";

const Page = () => {
  const { data: articles } = useGetArticlesQuery();
  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateArticle />
      {articles ? (
        <DataTable
          filterColumns={[{ title: "نام", column: "name" }]}
          columns={columns}
          data={articles}
        />
      ) : (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      )}
    </div>
  );
};

export default Page;
