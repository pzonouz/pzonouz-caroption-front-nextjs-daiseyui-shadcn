"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Category } from "@/app/lib/schemas";
import DataTableActions from "../Shared/DataTableActions";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام دسته بندی</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original?.name}</div>;
    },
  },
  {
    accessorKey: "parent_name",
    header: ({ column }) => <div className="text-right">والد</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row?.original?.parent_name}
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: () => <div className="text-right">زیرمجموعه</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original?.children?.length}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [category, setCategory] = useState<Category>();
      const { data: parentCategories } = useGetParentCategoriesQuery();
      const [deleteCategoryAction, { isLoading: deleteCategoryIsLoading }] =
        useDeleteCategoryMutation();
      const [selectedId, setSelectedId] = useState("");
      useEffect(() => {
        if (selectedId)
          deleteCategoryAction(selectedId)
            .unwrap()
            .then(() => {
              SuccessToast();
            })
            .catch((err: FetchBaseQueryError) => {
              if (err?.status == "PARSING_ERROR")
                ErrorToast(
                  "برای این دسته بندی کالا یا زیرمجموعه تعریف شده است",
                );
            });
      }, [selectedId]);

      return (
        <DataTableActions
          setSelectedId={setSelectedId}
          setObject={setCategory}
          isLoading={deleteCategoryIsLoading}
          row={row}
        />
      );
    },
  },
];
