"use client";

import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { Category } from "../../lib/schemas";
import { submitHandler, toggle } from "../../lib/utils";
import CategoryForm from "./CategoryForm";

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
    handleSubmit,
    createCategoryAction,
    getValues,
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
          error={error}
          isLoading={createCategoryIsLoading}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          submitHandler={submitHandler<Category>({
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
