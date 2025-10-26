"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Article, articleSchema } from "@/app/lib/schemas";
import { useCreateArticleMutation } from "@/app/lib/features/api";

export const useCreateArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm<Article>({
    resolver: zodResolver(articleSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createArticleAction, { isLoading: createArticleIsLoading }] =
    useCreateArticleMutation();
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
    createArticleAction,
    createArticleIsLoading,
  };
};
