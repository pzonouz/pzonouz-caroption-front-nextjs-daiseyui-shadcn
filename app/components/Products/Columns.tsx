"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Product } from "@/app/lib/schemas";
import ProductActionsCell from "./ProductActionsCell";

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
      if (!row.getValue("price")) return null;
      const price = row.getValue("price")?.toString();
      const formatted = price?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "count",
    header: () => <div className="text-right">تعداد</div>,
    cell: ({ row }) => {
      if (!row.getValue("count")) return null;
      const count = row.getValue("count")?.toString();
      const formatted = count?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActionsCell row={row} />,
  },
];
