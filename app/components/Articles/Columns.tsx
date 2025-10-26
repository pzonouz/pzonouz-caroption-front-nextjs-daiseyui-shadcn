"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/app/lib/schemas";
import ArticleActionsCell from "./ArticleActionsCell";

export const columns: ColumnDef<Article>[] = [
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
    cell: ({ row }) => <ArticleActionsCell row={row} />,
  },
];
