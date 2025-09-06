import { useDeleteParameterGroupMutation } from "@/app/lib/features/api";
import { ParameterGroup } from "@/app/lib/schemas";
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
import EditParameterGroupModal from "./EditParameterGroupModal";

const ParameterGroupActionsCell = ({ row }: { row: Row<ParameterGroup> }) => {
  const [
    deleteParameterGroupAction,
    { isLoading: deleteParameterGroupIsLoading },
  ] = useDeleteParameterGroupMutation();
  const [selectedId, setSelectedId] = useState<string | null | undefined>("");
  const [parameterGroup, setParameterGroup] = useState<ParameterGroup>();
  useEffect(() => {
    if (selectedId) {
      deleteParameterGroupAction(selectedId)
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
  }, [selectedId, deleteParameterGroupAction]);
  return (
    <>
      <EditParameterGroupModal
        parameterGroup={parameterGroup}
        setParameterGroup={setParameterGroup}
      />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            {deleteParameterGroupIsLoading ? (
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
              setParameterGroup(row?.original);
            }}
          >
            ویرایش
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ParameterGroupActionsCell;
