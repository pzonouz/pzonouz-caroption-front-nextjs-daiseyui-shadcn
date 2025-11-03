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
import { Modal } from "../Shared/Modal";

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
            brand: product.brand?.toString() ?? "",
            count: formatStringToCommaSeparatedNumber(
              product.count?.toString() ?? "",
            ),
            price: formatStringToCommaSeparatedNumber(
              product.price?.toString() ?? "",
            ),
            price2: product?.price2?.toString(),
            price3: product?.price3?.toString(),
            imageIds: product?.imageIds ?? [], // ✅ ensure always array
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editProductIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [dispatch, editProductIsLoading]);

  if (!product) return null;
  return (
    <Modal>
      <FontAwesomeIcon
        icon={faClose}
        className="absolute text-error cursor-pointer top-4 right-4"
        onClick={() => {
          setProduct(undefined);
        }}
      />
      <label className="text-3xl text-center w-5/6">ویرایش کالا</label>

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
      />
    </Modal>
  );
};

export default EditProductModal;
