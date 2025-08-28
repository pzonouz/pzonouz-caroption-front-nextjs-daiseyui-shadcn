"use client";
import { useEditEntityMutation } from "@/app/lib/features/api";
import { Entity, entitySchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditEntity({ entity }: { entity: Entity | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Entity>({ resolver: zodResolver(entitySchema) });

  useEffect(() => {
    if (entity) {
      reset(entity);
    }
  }, [entity, reset]);

  const [error, setError] = useState("");
  const [editEntityAction, { isLoading: editEntityIsLoading }] =
    useEditEntityMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editEntityAction,
    editEntityIsLoading,
    control,
  };
}
