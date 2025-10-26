import { useDeleteArticleMutation } from "@/app/lib/features/api";
import { Article } from "@/app/lib/schemas";
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
import EditArticleModal from "./EditArticleModal";

const ArticleActionsCell = ({ row }: { row: Row<Article> }) => {
  const [deleteArticleAction, { isLoading: deleteArticleIsLoading }] =
    useDeleteArticleMutation();
  const [selectedId, setSelectedId] = useState<string | null | undefined>("");
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    if (selectedId) {
      deleteArticleAction(selectedId)
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
  }, [selectedId, deleteArticleAction]);
  return (
    <>
      <EditArticleModal article={article} setArticle={setArticle} />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            {deleteArticleIsLoading ? (
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
              setArticle(row?.original);
            }}
          >
            ویرایش
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ArticleActionsCell;
