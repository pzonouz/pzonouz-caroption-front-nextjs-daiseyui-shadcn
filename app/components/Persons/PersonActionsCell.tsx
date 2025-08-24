import { useEffect, useState } from "react";
import EditPersonModal from "./EditPersonModal";
import DataTableActions from "../Shared/DataTableActions";
import { Row } from "@tanstack/react-table";
import { Person } from "../../lib/schemas";
import { useDeletePersonMutation } from "../../lib/features/api";
import { ErrorToast, SuccessToast } from "../../lib/Toasts";

const PersonActionsCell = ({ row }: { row: Row<Person> }) => {
  const [deletePersonAction, { isLoading: deletePersonIsLoading }] =
    useDeletePersonMutation();
  const [person, setPerson] = useState<Person | null>();
  const [selectedId, setSelectedId] = useState<string | null | undefined>();

  useEffect(() => {
    if (selectedId) {
      deletePersonAction(selectedId)
        .unwrap()
        .then(() => SuccessToast())

        .catch(() => ErrorToast("برای این شخص فاکتور ثبت شده است"));
    }
  }, [selectedId, deletePersonAction]);

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
};

export default PersonActionsCell;
