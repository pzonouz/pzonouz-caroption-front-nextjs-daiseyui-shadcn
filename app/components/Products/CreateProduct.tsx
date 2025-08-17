"use client";

import { submitHandler, toggle } from "@/app/lib/utils";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { Category } from "@/app/lib/schemas";
import { useCreateProduct } from "./hooks/useCreateProduct";
import ProductForm, { ProductFormValues } from "./ProductForm";

export function CreateProduct({ categories }: { categories: Category[] }) {
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
    control,
    handleSubmit,
    createProductAction,
    getValues,
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
          categories={categories}
          control={control}
          error={error}
          isLoading={createProductIsLoading}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          submitHandler={submitHandler<ProductFormValues>({
            action: createProductAction,
            handleSubmit,
            setError,
            reset,
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
