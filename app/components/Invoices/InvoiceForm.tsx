"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { FormField } from "../Shared/FormField";
import {
  formatStringToCommaSeparatedNumber,
  replacePersianDigits,
} from "@/app/lib/utils";
import { LoadingButton } from "../Shared/LoadingButton";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Invoice, Product } from "@/app/lib/schemas";
import {
  useGetPersonsQuery,
  useGetProductsQuery,
} from "@/app/lib/features/api";
import { Combobox } from "../Shared/ComboBox";
import { TrashIcon } from "lucide-react";
import classNames from "classnames";

interface InvoiceFormProp {
  invoice?: Invoice | null; // <-- add this
  register: UseFormRegister<Invoice>;
  errors: FieldErrors<Invoice>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Invoice>;
  watch: UseFormWatch<Invoice>;
  isLoading: boolean;
  error: string;
  type: string;
}

const InvoiceForm = ({
  register,
  errors,
  submitHandler,
  watch,
  setValue,
  isLoading,
  error,
  type,
  invoice,
}: InvoiceFormProp) => {
  const { data: persons } = useGetPersonsQuery();
  const { data: products } = useGetProductsQuery();

  const personValue = watch("personId");

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productsSum, setProductsSum] = useState<number>(0);
  useEffect(() => {
    const sum = selectedProducts.reduce((sum, p) => {
      return sum + Number(p.price) * Number(p.count);
    }, 0);
    setProductsSum(sum);
  }, [selectedProducts]);
  /** -------------------------
   * INIT: load initial items (edit mode)
   * ------------------------- */

  useEffect(() => {
    if (!invoice || !invoice.items || !products) return;

    const initialized = invoice.items.map((item) => {
      const found = products.find((p) => p.id === item.productId);

      return {
        ...found,
        id: item.productId,
        price: item.price,
        count: item.count,
        description: item.description,
      };
    });

    setSelectedProducts(initialized);
  }, [invoice, products]);

  /** -------------------------
   * Keep invoice "type" updated
   * ------------------------- */
  useEffect(() => {
    setValue("type", type);
  }, [type, setValue]);

  /** -------------------------
   * Sync selected products → RHF items
   * ------------------------- */
  useEffect(() => {
    const invoiceItems = selectedProducts.map((p) => ({
      productId: p.id,
      price: Number(p.price),
      count: Number(p.count),
      description: p.description || "",
      total: Number(p.price) * Number(p.count),
      netTotal: Number(p.price) * Number(p.count) - Number(p.discount),
    }));

    setValue("items", invoiceItems, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedProducts, setValue]);

  /** -------------------------
   * Update specific product
   * ------------------------- */
  const updateSelectedProduct = (id: string, field: string, value: any) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <form
      lang="fa"
      className="w-full mt-10 grid grid-cols-1 gap-3 mb-4"
      onSubmit={submitHandler}
    >
      {/* PERSON */}
      <Combobox
        array={persons?.map((person) => ({
          name: person?.lastName + " " + person?.firstName,
          id: person?.id,
        }))}
        setValue={(val: string) =>
          setValue("personId", val, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        value={personValue}
        title="نام مشتری"
      />

      {/* PRODUCTS */}
      {personValue && (
        <div>
          <Combobox
            array={products?.map((product: Product) => ({
              id: product.id,
              name: product.name,
            }))}
            setValue={(val: string) => {
              const exists = selectedProducts.find((p) => p.id === val);
              const prod = products?.find((p) => p.id === val);
              if (!exists && prod) {
                setSelectedProducts((prev) => [...prev, { ...prod, count: 1 }]);
              }
            }}
            value=""
            title="افزودن محصول"
          />

          <table
            className={classNames(`mt-4 border-2 bg-gray-50 w-full`, {
              "border-b-0": selectedProducts?.length == 0,
            })}
          >
            <thead className="border-b-2">
              <tr className="grid grid-cols-12 ">
                <th className="border-l-2 col-span-3">نام کالا</th>
                <th className="border-l-2 col-span-2">فی</th>
                <th className="border-l-2 col-span-1">تعداد</th>
                <th className="border-l-2 col-span-2">تخفیف</th>
                <th className="border-l-2 col-span-2">کل</th>
                <th className="border-l-2 col-span-1">توضیحات</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts?.map((product) => (
                <tr
                  key={product.id}
                  className="grid grid-cols-12 border-b-2 last:border-b-0"
                >
                  {/* PRODUCT NAME */}
                  <td className="px-4 col-span-3 border-l-2 grid place-items-center">
                    {product.name}
                  </td>

                  {/* PRICE */}
                  <td className="col-span-2 border-l-2">
                    <input
                      value={formatStringToCommaSeparatedNumber(product?.price)}
                      onChange={(e) => {
                        const raw = replacePersianDigits(
                          e.target.value.replace(/,/g, "")
                        );
                        updateSelectedProduct(product.id, "price", Number(raw));
                      }}
                      className="input w-full text-center"
                    />
                  </td>

                  {/* COUNT */}
                  <td className="col-span-1 border-l-2">
                    <input
                      type="number"
                      min={1}
                      value={product.count}
                      onChange={(e) =>
                        updateSelectedProduct(
                          product.id,
                          "count",
                          Number(e.target.value)
                        )
                      }
                      className="input w-full text-center"
                    />
                  </td>
                  {/* DISCOUNT */}
                  <td className="col-span-2 border-l-2">
                    <input
                      type="number"
                      min={1}
                      value={product.discount}
                      onChange={(e) =>
                        updateSelectedProduct(
                          product.id,
                          "discount",
                          Number(e.target.value)
                        )
                      }
                      className="input w-full text-center"
                    />
                  </td>
                  {/* COUNT* Price*/}
                  <td className="col-span-2 border-l-2">
                    <input
                      type="text"
                      value={""}
                      readOnly
                      className="input w-full text-center"
                    />
                  </td>
                  {/* DESCRIPTION */}
                  <td className="col-span-1 border-l-2">
                    <input
                      type="text"
                      className="input w-full text-center"
                      value={product.description || ""}
                      onChange={(e) =>
                        updateSelectedProduct(
                          product.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* DELETE */}
                  <td className="col-span-1 flex justify-center items-center">
                    <TrashIcon
                      className="cursor-pointer text-red-500"
                      onClick={() =>
                        setSelectedProducts((prev) =>
                          prev.filter((p) => p.id !== product.id)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {selectedProducts?.length > 0 && (
              <tfoot className="w-full border-t-2">
                <tr className="w-full grid grid-cols-12">
                  <th className="border-l-2 col-span-8">جمع کل</th>
                  <th className=" flex justify-center items-center gap-1 col-span-4">
                    <span>
                      {formatStringToCommaSeparatedNumber(productsSum)}
                    </span>
                    <span>تومان</span>
                  </th>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {/* NOTES */}
      <FormField
        label="توضیحات"
        title="notes"
        register={register}
        error={errors?.notes?.message}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <LoadingButton
        disabled={watch("items")?.length == 0}
        className="btn btn-primary"
        isLoading={isLoading}
      >
        ثبت
      </LoadingButton>
    </form>
  );
};

export default InvoiceForm;
