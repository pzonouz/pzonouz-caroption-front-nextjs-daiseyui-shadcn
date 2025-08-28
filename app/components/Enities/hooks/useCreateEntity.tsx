"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEntityMutation } from "@/app/lib/features/api";
import { Entity, entitySchema } from "@/app/lib/schemas";

export const useCreateEntity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
    getValues,
  } = useForm<Entity>({
    resolver: zodResolver(entitySchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createEntityAction, { isLoading: createEntityIsLoading }] =
    useCreateEntityMutation();
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
    createEntityAction,
    createEntityIsLoading,
  };
};
