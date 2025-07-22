"use client";
import {
  Check,
  ChevronsUpDown,
  Delete,
  Minus,
  MinusIcon,
  Plus,
  Trash,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import classNames from "classnames";
import {
  formatStringToCommaSepratedNumber,
  replacePersianDigits,
} from "@/app/lib/utils";
import {
  useCreateInvoiceItemMutation,
  useCreateInvoiceMutation,
  useDeleteInvoiceItemMutation,
  useDeleteInvoiceMutation,
  useEditInvoiceItemMutation,
  useGetInvoicesQuery,
  useGetPersonsQuery,
  useGetProductsQuery,
} from "@/app/lib/features/api";
import { useAppSelector } from "@/app/lib/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm } from "react-hook-form";
import {
  Invoice,
  InvoiceItem,
  invoiceItemSchema,
  Person,
  Product,
} from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersianDatePicker } from "../Utils/PersianDatePicker";

const InvoiceCreate = ({ type }: { type: string }) => {
  const access = useAppSelector((state) => state?.access?.access);
  const [editInvoiceItem] = useEditInvoiceItemMutation();
  const [deleteInvoiceItem] = useDeleteInvoiceItemMutation();
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const {
    data: invoices,
    error: invoicesError,
    isLoading: invoicesIsLoading,
    refetch: invoicesRefetch,
  } = useGetInvoicesQuery();
  const {
    data: persons,
    error: personsError,
    isLoading: personsIsLoading,
    refetch: personsRefetch,
  } = useGetPersonsQuery();
  const {
    data: products,
    error: roductsError,
    refetch: productsRefech,
    isLoading: productsIsLoading,
  } = useGetProductsQuery();
  const [createInvoice, { isLoading: createInvoiceIsLoading }] =
    useCreateInvoiceMutation();
  const [createInvoiceItem, { isLoading: createInvoiceItemIsLoading }] =
    useCreateInvoiceItemMutation();
  useEffect(() => {
    if (access != "") {
      invoicesRefetch();
      personsRefetch();
      productsRefech();
    }
  }, [access]);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const [openPerson, setOpenPerson] = useState(false);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [personid, setpersonid] = useState("");
  const [openProduct, setOpenProduct] = useState(false);
  const [productid, setProductid] = useState("");
  const [price, setPrice] = useState("");
  const [invoiceid, setInvoiceid] = useState("");
  const invoiceRef = useRef(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<InvoiceItem>({ resolver: zodResolver(invoiceItemSchema) });
  useEffect(() => {
    const formatedPrice = formatStringToCommaSepratedNumber(
      replacePersianDigits(
        products
          ?.find((p: Product) => p?.id?.toString() == productid)
          ?.price?.toString(),
      ),
    );
    setValue("price", formatedPrice);
    setPrice(formatedPrice);
  }, [productid]);
  useEffect(() => {
    setValue("invoice", invoiceid);
  }, [invoiceid]);
  useEffect(() => {
    setValue("product", productid);
  }, [productid]);
  return (
    <div className="mb-4">
      {openCreateInvoice ? (
        <Minus
          onClick={() => {
            setOpenCreateInvoice(false);
          }}
        />
      ) : (
        <Plus
          onClick={() => {
            setOpenCreateInvoice(true);
          }}
        />
      )}
      {openCreateInvoice && (
        <div className="w-full">
          {/* <PersianDatePicker /> */}
          {/* <div className="my-4"></div> */}
          <div ref={invoiceRef} className="flex flex-row gap-2">
            <div className="w-full">
              <Popover
                open={openPerson}
                onOpenChange={(v) => !personid && setOpenPerson(v)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPerson}
                    className="w-[200px] justify-between"
                  >
                    {personid
                      ? (() => {
                          const person = persons?.find(
                            (p: Person) => p.id?.toString() == personid,
                          );
                          return `${person?.lastname} ${person?.firstname} ${person?.phone}`;
                        })()
                      : "انتخاب طرف حساب..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white">
                  <Command>
                    <CommandInput
                      placeholder="انتخاب طرف حساب ..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>طرف حساب یافت نشد</CommandEmpty>
                      <CommandGroup>
                        {persons?.map((p: Person) => (
                          <CommandItem
                            key={p?.id}
                            value={p?.id?.toString()}
                            onSelect={() => {
                              setpersonid(
                                p?.id?.toString() == personid
                                  ? ""
                                  : p?.id?.toString()!,
                              );
                              setOpenPerson(false);
                            }}
                          >
                            {`${p.lastname} ${p.firstname} ${p.phone}`}
                            <Check
                              className={classNames(
                                "ml-auto",
                                personid === p?.id?.toString()
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {personid && !invoiceid && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!invoiceid)
                      createInvoice({ person: personid, type: "S" })
                        .unwrap()
                        .then((res: Invoice) => {
                          setInvoiceid(res?.id?.toString()!);
                        })
                        .catch((err: FetchBaseQueryError) => {});
                  }}
                >
                  {createInvoiceIsLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "ایجاد فاکتور"
                  )}
                </button>
              )}
              {invoiceid && (
                <>
                  <Trash
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteInvoice(invoiceid);
                      setInvoiceid("");
                      setpersonid("");
                    }}
                  />
                  <X
                    className="cursor-pointer"
                    color="black"
                    onClick={() => {
                      setInvoiceid("");
                      setpersonid("");
                    }}
                  />
                </>
              )}
            </div>
            <div className="w-full">
              {invoiceid && (
                <table className="w-full mt-2">
                  <thead>
                    <tr className="border-b-[2px] border-t-[2px] border-black border-solid grid grid-cols-11">
                      <th className="border-r-[2px] border-black border-solid col-span-2 ">
                        کالا
                      </th>
                      <th className="border-r-[2px] border-black border-solid col-span-2 ">
                        ت
                      </th>
                      <th className="border-r-[2px] border-black border-solid col-span-3 ">
                        فی
                      </th>
                      <th className="border-l-[2px] border-r-[2px] border-black border-solid col-span-3">
                        فی*تعداد
                      </th>
                      <th className="border-l-[2px]  border-black border-solid">
                        ع
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices
                      ?.find((i: Invoice) => i?.id?.toString() == invoiceid)
                      ?.invoiceitems?.map((item: InvoiceItem) => (
                        <tr
                          className="border-b-[2px] border-black border-solid grid grid-cols-11"
                          key={item?.id}
                        >
                          <td className="border-r-[2px] border-black border-solid col-span-2 grid place-items-center">
                            {item?.productname}
                          </td>
                          <td className="border-r-[2px] border-black border-solid grid place-items-center col-span-2">
                            <input
                              className="input input-ghost"
                              value={formatStringToCommaSepratedNumber(
                                item?.count,
                              )}
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
                          <td className="border-r-[2px] border-black border-solid col-span-3 grid place-items-center w-full">
                            <input
                              className="input input-ghost outline-offset-0 outline-0 w-full p-0"
                              value={formatStringToCommaSepratedNumber(
                                item?.price,
                              )}
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
                          <td className="border-l-[2px] border-r-[2px] border-black border-solid col-span-3 grid place-items-center text-sm">
                            {formatStringToCommaSepratedNumber(
                              (
                                Number(item?.price) * Number(item?.count)
                              ).toString(),
                            )}
                          </td>
                          <td className="border-l-[2px] border-black border-solid text-center grid place-items-center">
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
              )}
              {personid && invoiceid && (
                <div>
                  {createInvoiceOpen ? (
                    <Minus
                      onClick={() => {
                        setCreateInvoiceOpen(false);
                      }}
                    />
                  ) : (
                    <Plus
                      onClick={() => {
                        setCreateInvoiceOpen(true);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            {createInvoiceOpen && (
              <form
                onSubmit={handleSubmit((data) => {
                  data.price = data.price.replaceAll(",", "");
                  data.count = data.count.replaceAll(",", "");
                  createInvoiceItem(data)
                    .unwrap()
                    .then(() => {
                      setCreateInvoiceOpen(false);
                    })
                    .catch((err: FetchBaseQueryError) => {
                      console.log(err);
                    });
                })}
                className="w-full grid grid-cols-1"
              >
                <Popover open={openProduct} onOpenChange={setOpenProduct}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProduct}
                      className={classNames("w-[200px] justify-between", {})}
                    >
                      {productid
                        ? (() => {
                            const pro = products?.find(
                              (p: Product) => p.id?.toString() == productid,
                            );
                            return `${pro?.name}`;
                          })()
                        : "انتخاب کالا ...."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white">
                    <Command>
                      <CommandInput
                        placeholder="انتخاب کالا ..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>کالا یافت نشد</CommandEmpty>
                        <CommandGroup>
                          {products?.map((p: Product) => (
                            <CommandItem
                              key={p?.id}
                              value={p?.id?.toString()}
                              onSelect={() => {
                                setProductid(
                                  p?.id?.toString() === productid
                                    ? ""
                                    : p?.id?.toString()!,
                                );
                                setOpenProduct(false);
                              }}
                            >
                              {`${p.name}`}
                              <Check
                                className={classNames(
                                  "ml-auto",
                                  productid === p?.id?.toString()
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <input type="text" hidden {...register("product")} />
                <input
                  type="text"
                  hidden
                  defaultValue={personid}
                  name="person"
                />
                <input type="text" hidden defaultValue={type} name="type" />
                <input
                  type="text"
                  hidden
                  defaultValue={invoiceid}
                  name="invoice"
                />
                <input
                  type="text"
                  placeholder="تعداد"
                  className={classNames("input w-[200px] my-2", {
                    "input-error": errors?.count,
                  })}
                  {...register("count", {
                    onChange: (e) => {
                      setValue(
                        "count",
                        formatStringToCommaSepratedNumber(
                          replacePersianDigits(e.currentTarget.value),
                        ),
                      );
                    },
                  })}
                />
                {errors?.count && (
                  <p className="text-sm text-red-500 -mt-2">
                    {errors?.count?.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="مبلغ"
                  defaultValue={price}
                  {...register("price", {
                    onChange: (e) => {
                      setValue(
                        "price",
                        formatStringToCommaSepratedNumber(
                          replacePersianDigits(e.currentTarget.value),
                        ),
                      );
                    },
                  })}
                  className={classNames("input w-[200px] my-2", {
                    "input-error": errors?.price,
                  })}
                />
                {errors?.price && (
                  <p className="text-sm text-red-500 -mt-2">
                    {errors?.price?.message}
                  </p>
                )}
                <button className="btn btn-primary w-[200px]">
                  {createInvoiceIsLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "ثبت"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceCreate;
