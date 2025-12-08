"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Invoice } from "@/app/lib/schemas";
import InvoiceActionsCell from "./InvoiceActionsCell";
import { replaceWithPersianDigits } from "@/app/lib/utils";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          شماره فاکتور
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const number = row.getValue("number");
      const formatted = replaceWithPersianDigits(number?.toString());
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "personName",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          نام مشتری
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const personName = row.getValue("personName");
      const formatted = personName?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <InvoiceActionsCell row={row} />;
    },
  },
];
