"use client";

import { submitHandler, toggle } from "@/app/lib/utils";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { useCreateCategory } from "./hooks/useCreateCategory";
import CategoryForm, { CategoryFormValues } from "./CategoryForm";
import { Category } from "@/app/lib/schemas";

export function CreateCategory({ categories }: { categories: Category[] }) {
  const {
    open,
    setOpen,
    error,
    errors,
    createCategoryIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    control,
    handleSubmit,
    createCategoryAction,
  } = useCreateCategory();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد دسته بندی</label>
        <CategoryForm
          categories={categories}
          control={control}
          error={error}
          isLoading={createCategoryIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<CategoryFormValues>({
            action: createCategoryAction,
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
