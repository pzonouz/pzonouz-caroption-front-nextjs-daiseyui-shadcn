import { useDeleteProductMutation } from "@/app/lib/features/api";
import { Product } from "@/app/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditProductModal from "./EditProductModal";

const ProductActionsCell = ({ row }: { row: Row<Product> }) => {
  const [deleteProductAction, { isLoading: deleteProductIsLoading }] =
    useDeleteProductMutation();
  const [selectedId, setSelectedId] = useState<string | null | undefined>("");
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    if (selectedId) {
      deleteProductAction(selectedId)
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
        .catch((err: FetchBaseQueryError) => {
          if (err?.status == 500) {
            toast("برای این کالا فاکتور تعریف شده است", {
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
          }
        });
    }
  }, [selectedId, deleteProductAction]);
  return (
    <>
      <EditProductModal product={product} setProduct={setProduct} />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            {deleteProductIsLoading ? (
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
              setProduct(row?.original);
            }}
          >
            ویرایش
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProductActionsCell;
