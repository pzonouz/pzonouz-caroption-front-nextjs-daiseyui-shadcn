"use client";

import { ColumnDef } from "@tanstack/react-table";
import EntityActionsCell from "./EntityActionsCell";
import { Entity } from "../../lib/schemas";

export const columns: ColumnDef<Entity>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام موجودیت</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original?.name}</div>;
    },
  },
  {
    accessorKey: "parentName",
    header: () => <div className="text-right">والد</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row?.original?.parentName}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EntityActionsCell row={row} />,
  },
];
