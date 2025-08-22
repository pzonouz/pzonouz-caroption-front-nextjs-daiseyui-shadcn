"use client";
import { useEditCategoryMutation } from "@/app/lib/features/api";
import { Category, categorySchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditCategory({
  category,
}: {
  category: Category | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<Category>({ resolver: zodResolver(categorySchema) });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const [error, setError] = useState("");
  const [editCategoryAction, { isLoading: editCategoryIsLoading }] =
    useEditCategoryMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editCategoryAction,
    editCategoryIsLoading,
    control,
    getValues,
  };
}
