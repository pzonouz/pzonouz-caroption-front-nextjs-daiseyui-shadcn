"use client";
import { columns } from "@/app/components/Categories/Columns";
import { CreateCategory } from "@/app/components/Categories/CreateCategory";
import { DataTable } from "@/app/components/Shared/DataTable";
import {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();

  const { data: categories, isFetching: categoriesIsFetching } =
    useGetCategoriesQuery();
  const { data: parentCategories, isFetching: parentCategoriesIsFetching } =
    useGetParentCategoriesQuery();
  useEffect(() => {
    if (categoriesIsFetching && parentCategoriesIsFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [categoriesIsFetching, parentCategoriesIsFetching, dispatch]);

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateCategory categories={parentCategories} />
      <DataTable
        columns={columns}
        data={categories ? categories : []}
        filterColumns={[{ title: "نام", column: "name" }]}
      />
    </div>
  );
};

export default Page;
