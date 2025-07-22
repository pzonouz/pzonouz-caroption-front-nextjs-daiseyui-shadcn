"use client";

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
import { useDeleteInvoiceMutation } from "@/app/lib/features/api";
import { toast } from "sonner";

import { Invoice } from "@/app/lib/schemas";
import EditInvoiceModal from "./EditInvoiceModal";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-right">ش</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("id");
      const formatted = name.toString();
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "personname",
    header: () => <div className="text-right">نام</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("personname");
      const formatted = name.toString();
      return (
        <div className="text-right font-medium max-w-[2rem] text-wrap">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">حالت</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("status");
      const formatted = name == "D" ? "موقت" : "نهایی";
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          مبلغ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const total = row.getValue("total")?.toString()!;
      const formatted = total?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [selectedId, setSelectedId] = useState("");
      const [deleteInvoiceAction, { isLoading: deleteInvoiceIsLaoding }] =
        useDeleteInvoiceMutation();

      const [invoice, setInvoice] = useState<Invoice>();
      useEffect(() => {
        if (selectedId) {
          deleteInvoiceAction(selectedId)
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
              toast("برای این فاکتور ردیف ثبت شده است", {
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
          <EditInvoiceModal invoice={invoice} setInvoice={setInvoice} />
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                {deleteInvoiceIsLaoding ? (
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
                  setSelectedId(row?.original?.id?.toString()!);
                }}
              >
                حذف
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-white cursor-pointer text-primary"
                onClick={() => {
                  setInvoice(row?.original);
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
