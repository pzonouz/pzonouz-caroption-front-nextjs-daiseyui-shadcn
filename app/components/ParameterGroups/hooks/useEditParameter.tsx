"use client";
import { useEditParameterGroupMutation } from "@/app/lib/features/api";
import { ParameterGroup, parameterGroupSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditParameterGroup({
  parameterGroup,
}: {
  parameterGroup: ParameterGroup | undefined;
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
  } = useForm<ParameterGroup>({ resolver: zodResolver(parameterGroupSchema) });

  useEffect(() => {
    if (parameterGroup) {
      reset(parameterGroup);
    }
  }, [parameterGroup, reset]);

  const [error, setError] = useState("");
  const [editParameterGroupAction, { isLoading: editParameterGroupIsLoading }] =
    useEditParameterGroupMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editParameterGroupAction,
    editParameterGroupIsLoading,
    control,
    getValues,
  };
}
