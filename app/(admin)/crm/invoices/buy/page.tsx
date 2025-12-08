"use client";

import { columns } from "@/app/components/Invoices/Columns";
import { CreateInvoice } from "@/app/components/Invoices/CreateInvoice";
import { DataTable } from "@/app/components/Shared/DataTable";
import { useGetInvoicesQuery } from "@/app/lib/features/api";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state?.access?.access);
  const { data: invoices, isFetching } = useGetInvoicesQuery(undefined, {
    skip: !access,
  });
  useEffect(() => {
    if (isFetching) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isFetching, dispatch]);

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateInvoice type="buy" />
      <DataTable
        columns={columns}
        data={invoices ? invoices : []}
        filterColumns={[
          { title: "نام مشتری", column: "personName" },
          { title: "شماره فاکتور", column: "number" },
        ]}
      />
    </div>
  );
};

export default Page;
