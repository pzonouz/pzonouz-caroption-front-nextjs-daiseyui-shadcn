"use client";

import { submitHandler, toggle } from "@/app/lib/utils";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import InvoiceForm from "./InvoiceForm";
import { Invoice } from "@/app/lib/schemas";
import { useCreateInvoice } from "./Hooks/useCreateInvoice";

export function CreateInvoice({ type }: { type: "buy" | "sell" }) {
  const {
    open,
    setOpen,
    error,
    errors,
    createInvoiceIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createInvoiceAction,
  } = useCreateInvoice();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد فاکتور</label>
        <InvoiceForm
          error={error}
          isLoading={createInvoiceIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Invoice>({
            action: createInvoiceAction,
            handleSubmit,
            setError,
            reset,
          })}
          errors={errors}
          register={register}
          type={type}
        />
      </CollapsibleSection>
    </div>
  );
}
