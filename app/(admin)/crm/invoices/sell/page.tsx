"use client";
import { columns } from "@/app/components/Invoices/Columns";
import InvoiceCreate from "@/app/components/Invoices/InvoiceCreate";
import { DataTable } from "@/app/components/Invoices/InvoicesList";
import { useGetInvoicesQuery } from "@/app/lib/features/api";
import { useAppSelector } from "@/app/lib/hooks";

const Page = () => {
  const access = useAppSelector((state) => state?.access?.access);
  const { data: invoices } = useGetInvoicesQuery(undefined, { skip: !access });

  return (
    <div className="pb-3">
      <InvoiceCreate type="S" />
      {invoices ? (
        <DataTable columns={columns} data={invoices} />
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </div>
  );
};

export default Page;
