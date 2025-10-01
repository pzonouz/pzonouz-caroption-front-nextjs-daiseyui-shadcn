"use client";

import { ColumnDef } from "@tanstack/react-table";
import CategoryActionsCell from "./CategoryActionsCell";
import { Category } from "../../lib/schemas";

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
    cell: ({ row }) => <CategoryActionsCell row={row} />,
  },
];
