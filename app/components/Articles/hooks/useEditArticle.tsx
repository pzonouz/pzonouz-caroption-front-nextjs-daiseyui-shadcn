"use client";
import { useEditArticleMutation } from "@/app/lib/features/api";
import { Article, articleSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditArticle({ article }: { article: Article | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<Article>({ resolver: zodResolver(articleSchema) });

  useEffect(() => {
    if (article) {
      reset(article);
    }
  }, [article, reset]);

  const [error, setError] = useState("");
  const [editArticleAction, { isLoading: editArticleIsLoading }] =
    useEditArticleMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editArticleAction,
    editArticleIsLoading,
    control,
    getValues,
  };
}
