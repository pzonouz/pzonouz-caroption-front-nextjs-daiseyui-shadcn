"use client";

import { Category } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetParentCategoriesQuery,
} from "@/app/lib/features/api";
import { toast } from "sonner";
import EditCategoryModal from "./EditCategoryModal";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
              toast("با موفقیت انجام شد", {
                position: "top-center",
                duration: 3000,
                style: {
                  backgroundColor: "green",
                  color: "white",
                  padding: "1rem",
                  fontFamily: "IranSans",
                  fontWeight: "bold",
                },
              });
            })
            .catch((err: FetchBaseQueryError) => {
              if (err?.status == "PARSING_ERROR")
                toast("برای این دسته بندی کالا یا زیرمجموعه تعریف شده است", {
                  position: "top-center",
                  duration: 3000,
                  style: {
                    backgroundColor: "red",
                    color: "white",
                    padding: "1rem",
                    fontFamily: "IranSans",
                    fontWeight: "bold",
                  },
                });
            });
      }, [selectedId]);

      return (
        <>
          {category && (
            <EditCategoryModal
              parentCategories={parentCategories}
              category={category}
              setCategory={setCategory}
            />
          )}
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                {deleteCategoryIsLoading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuItem
                className="cursor-pointer text-error"
                onClick={() => {
                  setSelectedId(row.original?.id);
                }}
              >
                حذف
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-white cursor-pointer text-primary"
                onClick={() => {
                  setCategory(row?.original);
                }}
              >
                ویرایش
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
