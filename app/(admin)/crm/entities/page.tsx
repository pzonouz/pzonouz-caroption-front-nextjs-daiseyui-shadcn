"use client";
import { columns } from "@/app/components/Enities/Columns";
import { CreateEntity } from "@/app/components/Enities/CreateEntity";
import { DataTable } from "@/app/components/Shared/DataTable";
import {
  useGetEntitiesQuery,
  useGetParentEntitiesQuery,
} from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();

  const { data: entities, isFetching: entitiesIsFetching } =
    useGetEntitiesQuery();
  const { data: parentEntities, isFetching: parentEntitiesIsFetching } =
    useGetParentEntitiesQuery();
  useEffect(() => {
    if (entitiesIsFetching && parentEntitiesIsFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [parentEntitiesIsFetching, entitiesIsFetching, dispatch]);

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateEntity entities={parentEntities} />
      <DataTable
        columns={columns}
        data={entities ? entities : []}
        filterColumns={[{ title: "نام", column: "name" }]}
      />
    </div>
  );
};

export default Page;
