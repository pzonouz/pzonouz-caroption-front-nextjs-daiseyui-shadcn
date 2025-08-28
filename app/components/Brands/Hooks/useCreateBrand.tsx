"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBrandMutation } from "@/app/lib/features/api";
import { Brand, brandSchema } from "@/app/lib/schemas";

export const useCreateBrand = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Brand>({
    resolver: zodResolver(brandSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createBrandAction, { isLoading: createBrandIsLoading }] =
    useCreateBrandMutation();
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
    createBrandAction,
    createBrandIsLoading,
  };
};
