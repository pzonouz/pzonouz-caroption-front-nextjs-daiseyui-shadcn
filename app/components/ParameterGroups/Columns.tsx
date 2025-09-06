"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ParameterGroup } from "@/app/lib/schemas";
import ParameterGroupActionsCell from "./ParameterGroupActionsCell";

export const columns: ColumnDef<ParameterGroup>[] = [
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
    accessorKey: "category_name",
    header: () => <div className="text-right">دسته بندی کالا</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("category_name");
      const formatted = name.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ParameterGroupActionsCell row={row} />,
  },
];
