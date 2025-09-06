"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Parameter, parameterSchema } from "@/app/lib/schemas";
import { useCreateParameterMutation } from "@/app/lib/features/api";

export const useCreateParameter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm<Parameter>({
    resolver: zodResolver(parameterSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createParameterAction, { isLoading: createParameterIsLoading }] =
    useCreateParameterMutation();
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
    createParameterAction,
    createParameterIsLoading,
  };
};
