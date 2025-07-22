import {
  useDeleteInvoiceMutation,
  useEditInvoiceItemMutation,
  useEditInvoiceMutation,
} from "@/app/lib/features/api";
import { Invoice, InvoiceItem } from "@/app/lib/schemas";
import { formatStringToCommaSepratedNumber } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Trash } from "lucide-react";

const EditInvoiceModal = ({
  invoice,
  setInvoice,
}: {
  invoice: Invoice | null | undefined;
  setInvoice: Function;
}) => {
  const [editInvoiceItem] = useEditInvoiceItemMutation();
  const [deleteInvoiceItem] = useDeleteInvoiceMutation();
  const [editInvoice] = useEditInvoiceMutation();
  return (
    invoice && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full">
          <div className="modal-action w-full bg-white ">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setInvoice(null);
              }}
            />
            <div>
              <table className="w-full">
                <thead>
                  <tr className="  border-black border-solid grid grid-cols-10">
                    <th className=" border-r-[2px] border-t-[2px] border-b-[2px] border-black border-solid col-span-2 ">
                      کالا
                    </th>
                    <th className=" border-r-[2px] border-t-[2px] border-b-[2px] border-black border-solid ">
                      ت
                    </th>
                    <th className="border-r-[2px] border-t-[2px] border-b-[2px] border-black border-solid col-span-3 ">
                      فی
                    </th>
                    <th className="border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] border-black border-solid col-span-3">
                      فی*تعداد
                    </th>
                    <th className="border-l-[2px] border-t-[2px] border-b-[2px]  border-black border-solid">
                      ع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.invoiceitems?.map((item: InvoiceItem) => (
                    <tr
                      className=" border-black border-solid grid grid-cols-10"
                      key={item?.id}
                    >
                      <td className="border-r-[2px] border-b-[2px] border-black border-solid col-span-2 grid place-items-center">
                        {item?.productname}
                      </td>
                      <td className="border-r-[2px] border-b-[2px] w-fit wrap-break-word border-black border-solid grid place-items-center">
                        <input
                          className="input input-ghost"
                          value={formatStringToCommaSepratedNumber(item?.count)}
                          onChange={(e) => {
                            editInvoiceItem({
                              count: e.target.value.replaceAll(",", ""),
                              id: item?.id,
                            })
                              .unwrap()
                              .then()
                              .catch((err: FetchBaseQueryError) =>
                                console.log(err),
                              );
                          }}
                        />
                      </td>
                      <td className="border-r-[2px] border-b-[2px] border-black border-solid col-span-3 grid place-items-center w-full">
                        <input
                          className="input input-ghost outline-offset-0 outline-0 w-full p-0"
                          value={formatStringToCommaSepratedNumber(item?.price)}
                          onChange={(e) => {
                            editInvoiceItem({
                              price: e.target.value.replaceAll(",", ""),
                              id: item?.id,
                            })
                              .unwrap()
                              .then()
                              .catch();
                          }}
                        />
                      </td>
                      <td className="border-l-[2px] border-r-[2px] border-b-[2px] border-black border-solid col-span-3 grid place-items-center text-sm">
                        {formatStringToCommaSepratedNumber(
                          (
                            Number(item?.price) * Number(item?.count)
                          ).toString(),
                        )}
                      </td>
                      <td className="border-l-[2px] border-b-[2px] border-black border-solid text-center grid place-items-center">
                        <Trash
                          className="h-full cursor-pointer"
                          color="red"
                          onClick={() => {
                            deleteInvoiceItem(item?.id)
                              .then(() => {})
                              .catch(() => {});
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditInvoiceModal;
