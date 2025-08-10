"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategoryMutation } from "@/app/lib/features/api";
import { Category, categorySchema } from "@/app/lib/schemas";

export const useCreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createCategoryAction, { isLoading: createCategoryIsLoading }] =
    useCreateCategoryMutation();
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
    createCategoryAction,
    createCategoryIsLoading,
  };
};
