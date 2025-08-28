"use client";
import { useEditBrandMutation } from "@/app/lib/features/api";
import { Brand, brandSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditBrand({ brand }: { brand: Brand | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Brand>({ resolver: zodResolver(brandSchema) });

  useEffect(() => {
    if (brand) {
      reset(brand);
    }
  }, [brand, reset]);

  const [error, setError] = useState("");
  const [editBrandAction, { isLoading: editBrandIsLoading }] =
    useEditBrandMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editBrandAction,
    editBrandIsLoading,
  };
}
