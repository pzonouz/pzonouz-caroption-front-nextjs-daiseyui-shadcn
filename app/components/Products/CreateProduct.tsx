"use client";

import { Product } from "../../lib/schemas";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { useCreateProduct } from "./hooks/useCreateProduct";
import ProductForm from "./ProductForm";
import { submitHandler, toggle } from "../../lib/utils";
import { useEffect } from "react";

export function CreateProduct() {
  const {
    open,
    setOpen,
    error,
    errors,
    createProductIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createProductAction,
  } = useCreateProduct();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد کالا</label>
        <ProductForm
          error={error}
          isLoading={createProductIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Product>({
            action: createProductAction,
            handleSubmit,
            setError,
            reset,
            transform: (data) => ({
              ...data,
              count: data.count?.replaceAll(",", ""),
              price: data?.price?.replaceAll(",", ""),
            }),
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
