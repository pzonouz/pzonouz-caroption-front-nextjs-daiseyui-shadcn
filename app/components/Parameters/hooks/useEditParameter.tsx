"use client";
import { useEditParameterMutation } from "@/app/lib/features/api";
import { Parameter, parameterSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditParameter({
  parameter,
}: {
  parameter: Parameter | undefined;
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
  } = useForm<Parameter>({ resolver: zodResolver(parameterSchema) });

  useEffect(() => {
    if (parameter) {
      reset(parameter);
    }
  }, [parameter, reset]);

  const [error, setError] = useState("");
  const [editParameterAction, { isLoading: editParameterIsLoading }] =
    useEditParameterMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editParameterAction,
    editParameterIsLoading,
    control,
    getValues,
  };
}
