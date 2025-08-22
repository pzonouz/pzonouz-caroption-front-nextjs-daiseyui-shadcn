"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditCategory } from "./hooks/useEditCategory";
import CategoryForm from "./CategoryForm";
import React, { useEffect } from "react";
import { Category } from "../../lib/schemas";
import { useGetCategoriesQuery } from "../../lib/features/api";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { submitHandler } from "../../lib/utils";

const EditCategoryModal = ({
  category,
  setCategory,
}: {
  category: Category | null | undefined;
  setCategory: React.Dispatch<
    React.SetStateAction<Category | null | undefined>
  >;
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
    editCategoryIsLoading,
    editCategoryAction,
    getValues,
  } = useEditCategory({ category });

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, dispatch]);

  if (!category) return null;

  return (
    <dialog open className="modal w-full">
      <div className="modal-box w-full relative">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setCategory(undefined);
            }}
          />
          <label className=" text-3xl text-center w-5/6">
            ویرایش دسته بندی
          </label>
          <CategoryForm
            submitHandler={submitHandler<Category>({
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
            categories={categories ?? []}
            getValues={getValues}
          />
        </div>
      </div>
    </dialog>
  );
};

export default EditCategoryModal;
