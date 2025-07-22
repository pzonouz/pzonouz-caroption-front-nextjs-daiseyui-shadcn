"use client";

import { useDeleteProductMutation } from "@/app/lib/features/api";
import { Product } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditProductModal from "./EditProductModal";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const formatted = name.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          قیمت
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price")?.toString()!;
      const formatted = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "count",
    header: () => <div className="text-right">تعداد</div>,
    cell: ({ row }) => {
      const count = row.getValue("count")?.toString()!;
      const formatted = count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [deleteProductAction, { isLoading: deleteProductIsLoading }] =
        useDeleteProductMutation();
      const [selectedId, setSelectedId] = useState("");
      const [product, setProduct] = useState<Product>();
      useEffect(() => {
        if (selectedId) {
          deleteProductAction(selectedId)
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
              if (err?.status == 500) {
                toast("برای این کالا فاکتور تعریف شده است", {
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
              }
            });
        }
      }, [selectedId]);
      return (
        <>
          <EditProductModal product={product} setProduct={setProduct} />
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                {deleteProductIsLoading ? (
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
                  setSelectedId(row?.original?.id?.toString());
                }}
              >
                حذف
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-white cursor-pointer text-primary"
                onClick={() => {
                  setProduct(row?.original);
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
