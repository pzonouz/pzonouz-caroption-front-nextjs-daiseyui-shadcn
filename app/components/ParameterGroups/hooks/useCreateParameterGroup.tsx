"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParameterGroup, parameterGroupSchema } from "@/app/lib/schemas";
import { useCreateParameterGroupMutation } from "@/app/lib/features/api";

export const useCreateParameterGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm<ParameterGroup>({
    resolver: zodResolver(parameterGroupSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [
    createParameterGroupAction,
    { isLoading: createParameterGroupIsLoading },
  ] = useCreateParameterGroupMutation();
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
    createParameterGroupAction,
    createParameterGroupIsLoading,
  };
};
