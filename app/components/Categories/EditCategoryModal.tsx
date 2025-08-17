"use client";

import { Category } from "@/app/lib/schemas";
import { submitHandler } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditCategory } from "./hooks/useEditCategory";
import CategoryForm, { CategoryFormValues } from "./CategoryForm";
import { useGetCategoriesQuery } from "@/app/lib/features/api";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";

const EditCategoryModal = ({
  category,
  setCategory,
}: {
  category: Category | undefined;
  setCategory: Function;
}) => {
  if (!category) return null;
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    control,
    editCategoryIsLoading,
    editCategoryAction,
    getValues,
  } = useEditCategory({ category: category });
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading]);
  return (
    category && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full relative">
          <div className="modal-action w-full flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setCategory(null);
              }}
            />
            <label className=" text-3xl text-center w-5/6">
              ویرایش دسته بندی
            </label>
            <CategoryForm
              submitHandler={submitHandler<CategoryFormValues>({
                action: editCategoryAction,
                handleSubmit,
                setError,
                reset,
                setObject: setCategory,
              })}
              error={error}
              isLoading={editCategoryIsLoading}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
              categories={categories}
              getValues={getValues}
            />
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditCategoryModal;
