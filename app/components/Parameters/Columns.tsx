"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Parameter } from "@/app/lib/schemas";
import ParameterActionsCell from "./ParameterActionsCell";

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
    id: "actions",
    cell: ({ row }) => <ParameterActionsCell row={row} />,
  },
];
