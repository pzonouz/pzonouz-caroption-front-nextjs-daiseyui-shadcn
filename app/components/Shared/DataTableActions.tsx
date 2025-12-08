import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface DataTableActionsProps<T> {
  setSelectedId: Function;
  setObject: Function;
  isLoading: boolean;
  row: Row<T>;
}

const DataTableActions = <T,>({
  setSelectedId,
  isLoading,
  setObject,
  row,
}: DataTableActionsProps<T>) => (
  <DropdownMenu dir="rtl">
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
        <span className="sr-only">Open menu</span>
        {isLoading ? (
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
          const confirmed = window.confirm(
            "آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟"
          );
          if (confirmed) {
            // @ts-ignore
            setSelectedId(row?.original?.id?.toString());
          }
        }}
      >
        حذف
      </DropdownMenuItem>
      <DropdownMenuItem
        className="bg-white cursor-pointer text-primary"
        onClick={() => {
          setObject(row?.original);
        }}
      >
        ویرایش
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DataTableActions;
