"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Entity } from "../../lib/schemas";
import EntityActionsCell from "./EntityActionsCell";

export const columns: ColumnDef<Entity>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام موجودیت</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original?.name}</div>;
    },
  },
  {
    accessorKey: "parent_name",
    header: () => <div className="text-right">والد</div>,
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
    cell: ({ row }) => <EntityActionsCell row={row} />,
  },
];
