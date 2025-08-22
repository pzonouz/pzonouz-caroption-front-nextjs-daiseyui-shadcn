"use client";
import { useEditProductMutation } from "@/app/lib/features/api";
import { Product, productSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditProduct({ product }: { product: Product | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<Product>({ resolver: zodResolver(productSchema) });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const [error, setError] = useState("");
  const [editProductAction, { isLoading: editProductIsLoading }] =
    useEditProductMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editProductAction,
    editProductIsLoading,
    control,
    getValues,
  };
}
