"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditProduct } from "./hooks/useEditProduct";
import ProductForm from "./ProductForm";
import React, { useEffect, useMemo } from "react";
import { Product } from "../../lib/schemas";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import {
  formatStringToCommaSeparatedNumber,
  submitHandler,
} from "../../lib/utils";
import { useGetCategoriesQuery } from "@/app/lib/features/api";

const EditProductModal = ({
  product,
  setProduct,
}: {
  product: Product | null | undefined;
  setProduct: React.Dispatch<React.SetStateAction<Product | null | undefined>>;
}) => {
  const normalizedProduct = useMemo(
    () =>
      product
        ? {
            ...product,
            category: product.category?.toString() ?? "",
            count: formatStringToCommaSeparatedNumber(
              product.count?.toString() ?? "",
            ),
            price: formatStringToCommaSeparatedNumber(
              product.price?.toString() ?? "",
            ),
          }
        : undefined,
    [product],
  );
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editProductIsLoading,
    editProductAction,
  } = useEditProduct({ product: normalizedProduct });

  const { data: categories, isFetching } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    if (isFetching || editProductIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isFetching, dispatch, editProductIsLoading]);

  if (!product) return null;

  return (
    <dialog open className="modal w-full">
      <div className="modal-box w-full relative">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setProduct(undefined);
            }}
          />
          <label className=" text-3xl text-center w-5/6">
            ویرایش دسته بندی
          </label>
          <ProductForm
            submitHandler={submitHandler<Product>({
              action: editProductAction,
              handleSubmit,
              setError,
              reset,
              setObject: setProduct,
              transform: (data) => ({
                ...data,
                count: data.count?.replaceAll(",", ""),
                price: data?.price?.replaceAll(",", ""),
                category: data?.category?.toString(),
              }),
            })}
            error={error}
            isLoading={editProductIsLoading}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            categories={categories ?? []}
          />
        </div>
      </div>
    </dialog>
  );
};

export default EditProductModal;
