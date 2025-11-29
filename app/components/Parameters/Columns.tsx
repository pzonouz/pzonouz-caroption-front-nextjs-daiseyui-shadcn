"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Parameter } from "@/app/lib/schemas";
import ParameterActionsCell from "./ParameterActionsCell";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Parameter>[] = [
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
    accessorKey: "parameterGroup",
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
      const name: string = row.getValue("parameterGroup");
      const formatted = name.toString();
      return <div className="text-center font-medium">{formatted}</div>;
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
    cell: ({ row }) => <ParameterActionsCell row={row} />,
  },
];
