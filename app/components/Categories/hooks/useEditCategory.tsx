"use client";
import { useEditPersonMutation } from "@/app/lib/features/api";
import {
  Category,
  categorySchema,
  Person,
  personSchema,
} from "@/app/lib/schemas";
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
    formState: { errors },
  } = useForm<Category>({ resolver: zodResolver(categorySchema) });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category]);

  const [error, setError] = useState("");
  const [editCategoryAction, { isLoading: editCategoryIsLoading }] =
    useEditPersonMutation();

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
  };
}
