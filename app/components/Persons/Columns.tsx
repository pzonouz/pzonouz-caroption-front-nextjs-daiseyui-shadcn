"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Person } from "@/app/lib/schemas";
import PersonActionsCell from "./PersonActionsCell";

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: () => <div className="text-right">نام</div>,
    cell: ({ row }) => {
      const firstName = row.getValue("firstName");
      const formatted = firstName?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          نام خانوادگی
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const lastName = row.getValue("lastName");
      const formatted = lastName?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-right">تلفن</div>,
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber");
      const formatted = phoneNumber?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <PersonActionsCell row={row} />;
    },
  },
];
