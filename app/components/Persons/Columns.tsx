"use client";

import { Person } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDeletePersonMutation } from "@/app/lib/features/api";
import { toast } from "sonner";
import EditPersonModal from "./EditPersonModal";

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
            .then(() => {
              toast("با موفقیت انجام شد", {
                position: "top-center",
                duration: 3000,
                style: {
                  backgroundColor: "green",
                  color: "white",
                  padding: "1rem",
                  fontFamily: "IranSans",
                  fontWeight: "bold",
                },
              });
            })
            .catch(() => {
              toast("برای این شخص فاکتور ثبت شده است", {
                position: "top-center",
                duration: 3000,
                style: {
                  backgroundColor: "red",
                  color: "white",
                  padding: "1rem",
                  fontFamily: "IranSans",
                  fontWeight: "bold",
                },
              });
            });
        }
      }, [selectedId]);

      return (
        <>
          <EditPersonModal person={person} setPerson={setPerson} />
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                {deletePersonIsLoading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuItem
                className="cursor-pointer text-error"
                onClick={() => {
                  setSelectedId(row?.original?.id?.toString());
                }}
              >
                حذف
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-white cursor-pointer text-primary"
                onClick={() => {
                  setPerson(row?.original);
                }}
              >
                ویرایش
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
