"use client";

import { Invoice } from "@/app/lib/schemas";
import { submitHandler } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvoiceForm from "./InvoiceForm";
import { useEditInvoice } from "./Hooks/useEditInvoice";

const EditInvoiceModal = ({
  invoice,
  setInvoice,
  type,
}: {
  invoice: Invoice | null | undefined;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | null | undefined>>;
  type: string;
}) => {
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editInvoiceIsLoading,
    editInvoiceAction,
  } = useEditInvoice({ invoice: invoice ?? undefined });
  if (!invoice) return null;
  return (
    invoice && (
      <dialog open className="modal w-full z-[1000000]">
        <div className="modal-box w-5/6 max-w-5xl relative">
          <div className="modal-action w-full flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setInvoice(null);
              }}
            />
            <label className=" text-3xl text-center w-5/6">ویرایش فاکتور</label>
            <InvoiceForm
              submitHandler={submitHandler<Invoice>({
                action: editInvoiceAction,
                handleSubmit,
                setError,
                reset,
                reload: () => {
                  window.location.reload();
                },
                setObject: setInvoice,
              })}
              error={error}
              isLoading={editInvoiceIsLoading}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              type={type}
              invoice={invoice}
            />
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditInvoiceModal;
