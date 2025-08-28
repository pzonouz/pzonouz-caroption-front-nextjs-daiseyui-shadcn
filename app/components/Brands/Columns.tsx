"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "@/app/lib/schemas";
import BrandActionsCell from "./BrandActionsCell";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-right">نام</div>,
    cell: ({ row }) => {
      const firstname = row.getValue("name");
      const formatted = firstname?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <BrandActionsCell row={row} />;
    },
  },
];
