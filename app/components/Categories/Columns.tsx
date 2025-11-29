"use client";

import { ColumnDef } from "@tanstack/react-table";
import CategoryActionsCell from "./CategoryActionsCell";
import { Category } from "../../lib/schemas";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام دسته بندی</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original?.name}</div>;
    },
  },
  {
    accessorKey: "parentName",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          والد
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row?.original?.parentName}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue<string>(columnId) ?? "";
      const b = rowB.getValue<string>(columnId) ?? "";

      // مرتب‌سازی با توجه به زبان فارسی
      return a.localeCompare(b, "fa", { sensitivity: "base" });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryActionsCell row={row} />,
  },
];
