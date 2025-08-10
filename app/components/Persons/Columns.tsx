"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDeletePersonMutation } from "@/app/lib/features/api";
import EditPersonModal from "./EditPersonModal";
import { Person } from "@/app/lib/schemas";
import DataTableActions from "../Shared/DataTableActions";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstname",
    header: () => <div className="text-right">نام</div>,
    cell: ({ row }) => {
      const firstname = row.getValue("firstname");
      const formatted = firstname?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "lastname",
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
      const lastname = row.getValue("lastname");
      const formatted = lastname?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">تلفن</div>,
    cell: ({ row }) => {
      const phone = row.getValue("phone");
      const formatted = phone?.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [deletePersonAction, { isLoading: deletePersonIsLoading }] =
        useDeletePersonMutation();
      const [person, setPerson] = useState<Person>();
      const [selectedId, setSelectedId] = useState<string>();

      useEffect(() => {
        if (selectedId) {
          deletePersonAction(selectedId)
            .unwrap()
            .then(() => SuccessToast())

            .catch(() => ErrorToast("برای این شخص فاکتور ثبت شده است"));
        }
      }, [selectedId]);

      return (
        <>
          <EditPersonModal person={person} setPerson={setPerson} />
          <DataTableActions<Person>
            row={row}
            setObject={setPerson}
            isLoading={deletePersonIsLoading}
            setSelectedId={setSelectedId}
          />
        </>
      );
    },
  },
];
