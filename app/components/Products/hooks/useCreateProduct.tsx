"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, productSchema } from "@/app/lib/schemas";
import { useCreateProductMutation } from "@/app/lib/features/api";

export const useCreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
    getValues,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createProductAction, { isLoading: createProductIsLoading }] =
    useCreateProductMutation();
  return {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    watch,
    open,
    setOpen,
    error,
    setError,
    control,
    getValues,
    createProductAction,
    createProductIsLoading,
  };
};
