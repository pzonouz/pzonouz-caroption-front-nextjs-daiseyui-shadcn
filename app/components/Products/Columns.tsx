"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Product } from "@/app/lib/schemas";
import ProductActionsCell from "./ProductActionsCell";
import { replacePersianDigits } from "@/app/lib/utils";
import classNames from "classnames";

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
    accessorKey: "position",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          مکان
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      if (!row.getValue("position")) return null;
      const position = row.getValue("position")?.toString();
      return <div className="text-center font-medium">{position}</div>;
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          تعداد
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      if (!row.getValue("count")) return null;
      const count = row.getValue("count")?.toString();
      const formatted = count?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (
        <div
          className={classNames(
            "flex items-center justify-center h-6 rounded-lg text-center font-medium",
            row.getValue("count") == 0 && "bg-red-500 text-white",
            row.getValue("count") == 1 && "bg-yellow-500 text-white"
          )}
        >
          <div>{formatted}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: () => <div className="text-center">کد کالا</div>,
    cell: ({ row }) => {
      if (!row.getValue("code")) return null;
      const code = row.getValue("code")?.toString();
      return <div className="text-center font-medium">{code}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="text-center">
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
      if (!row.getValue("price")) return null;
      const price = row.getValue("price")?.toString();
      const formatted = replacePersianDigits(
        price?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActionsCell row={row} />,
  },
];
