import { useEffect, useState } from "react";
import EditBrandModal from "./EditBrandModal";
import DataTableActions from "../Shared/DataTableActions";
import { Row } from "@tanstack/react-table";
import { Brand } from "../../lib/schemas";
import { useDeleteBrandMutation } from "../../lib/features/api";
import { ErrorToast, SuccessToast } from "../../lib/Toasts";

const BrandActionsCell = ({ row }: { row: Row<Brand> }) => {
  const [deleteBrandAction, { isLoading: deleteBrandIsLoading }] =
    useDeleteBrandMutation();
  const [brand, setBrand] = useState<Brand | null>();
  const [selectedId, setSelectedId] = useState<string | null | undefined>();

  useEffect(() => {
    if (selectedId) {
      deleteBrandAction(selectedId)
        .unwrap()
        .then(() => SuccessToast())

        .catch(() => ErrorToast("برای این شخص فاکتور ثبت شده است"));
    }
  }, [selectedId, deleteBrandAction]);

  return (
    <>
      <EditBrandModal brand={brand} setBrand={setBrand} />
      <DataTableActions<Brand>
        row={row}
        setObject={setBrand}
        isLoading={deleteBrandIsLoading}
        setSelectedId={setSelectedId}
      />
    </>
  );
};

export default BrandActionsCell;
