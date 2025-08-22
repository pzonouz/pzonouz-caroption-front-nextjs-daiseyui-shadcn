import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import DataTableActions from "../Shared/DataTableActions";
import { Row } from "@tanstack/react-table";
import { Category } from "../../lib/schemas";
import { useDeleteCategoryMutation } from "../../lib/features/api";
import { ErrorToast, SuccessToast } from "../../lib/Toasts";

const CategoryActionsCell = ({ row }: { row: Row<Category> }) => {
  const [category, setCategory] = useState<Category | null | undefined>();
  const [deleteCategoryAction, { isLoading: deleteCategoryIsLoading }] =
    useDeleteCategoryMutation();
  const [selectedId, setSelectedId] = useState<string | null | undefined>("");
  useEffect(() => {
    if (selectedId)
      deleteCategoryAction({ id: Number(selectedId) })
        .unwrap()
        .then(() => {
          SuccessToast();
        })
        .catch((err: FetchBaseQueryError) => {
          if (err?.status == "PARSING_ERROR")
            ErrorToast("برای این دسته بندی کالا یا زیرمجموعه تعریف شده است");
        });
  }, [selectedId, deleteCategoryAction]);

  return (
    <>
      <EditCategoryModal category={category} setCategory={setCategory} />
      <DataTableActions
        setSelectedId={setSelectedId}
        setObject={setCategory}
        isLoading={deleteCategoryIsLoading}
        row={row}
      />
    </>
  );
};
export default CategoryActionsCell;
