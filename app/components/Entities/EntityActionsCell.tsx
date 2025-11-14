import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import EditEntityModal from "./EditEntityModal";
import DataTableActions from "../Shared/DataTableActions";
import { Row } from "@tanstack/react-table";
import { Entity } from "../../lib/schemas";
import { useDeleteEntityMutation } from "../../lib/features/api";
import { ErrorToast, SuccessToast } from "../../lib/Toasts";

const EntityActionsCell = ({ row }: { row: Row<Entity> }) => {
  const [entity, setEntity] = useState<Entity | null | undefined>();
  const [deleteEntityAction, { isLoading: deleteEntityIsLoading }] =
    useDeleteEntityMutation();
  const [selectedId, setSelectedId] = useState<string | null | undefined>("");
  useEffect(() => {
    if (selectedId)
      deleteEntityAction(selectedId)
        .unwrap()
        .then(() => {
          SuccessToast();
        })
        .catch((err: FetchBaseQueryError) => {
          if (err?.status == "PARSING_ERROR")
            ErrorToast("برای این دسته بندی کالا یا زیرمجموعه تعریف شده است");
        });
  }, [selectedId, deleteEntityAction]);

  return (
    <>
      <EditEntityModal entity={entity} setEntity={setEntity} />
      <DataTableActions
        setSelectedId={setSelectedId}
        setObject={setEntity}
        isLoading={deleteEntityIsLoading}
        row={row}
      />
    </>
  );
};
export default EntityActionsCell;
