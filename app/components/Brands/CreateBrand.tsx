"use client";

import { submitHandler, toggle } from "@/app/lib/utils";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { Brand } from "@/app/lib/schemas";
import { useCreateBrand } from "./Hooks/useCreateBrand";
import BrandForm from "./BrandForm";

export function CreateBrand() {
  const {
    open,
    setOpen,
    error,
    errors,
    createBrandIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createBrandAction,
  } = useCreateBrand();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد برند</label>
        <BrandForm
          error={error}
          isLoading={createBrandIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Brand>({
            action: createBrandAction,
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
