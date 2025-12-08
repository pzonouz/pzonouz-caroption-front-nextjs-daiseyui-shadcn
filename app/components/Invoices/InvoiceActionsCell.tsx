import { useEffect, useState } from "react";
import DataTableActions from "../Shared/DataTableActions";
import { Row } from "@tanstack/react-table";
import { Invoice } from "../../lib/schemas";
import { useDeleteInvoiceMutation } from "../../lib/features/api";
import { SuccessToast } from "../../lib/Toasts";
import { handleFetchErrors } from "@/app/lib/utils";
import EditInvoiceModal from "./EditInvoiceModal";

const InvoiceActionsCell = ({ row }: { row: Row<Invoice> }) => {
  const [deleteInvoiceAction, { isLoading: deleteInvoiceIsLoading }] =
    useDeleteInvoiceMutation();
  const [invoice, setInvoice] = useState<Invoice | null>();
  const [selectedId, setSelectedId] = useState<string | null | undefined>();

  useEffect(() => {
    if (selectedId) {
      deleteInvoiceAction(selectedId)
        .unwrap()
        .then(() => SuccessToast())

        .catch((err) => handleFetchErrors(err));
    }
  }, [selectedId, deleteInvoiceAction]);

  return (
    <>
      <EditInvoiceModal
        invoice={invoice}
        setInvoice={setInvoice}
        type={row.original.type}
      />
      <DataTableActions<Invoice>
        row={row}
        setObject={setInvoice}
        isLoading={deleteInvoiceIsLoading}
        setSelectedId={setSelectedId}
      />
    </>
  );
};

export default InvoiceActionsCell;
