"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePersonMutation } from "@/app/lib/features/api";
import { Person, personSchema } from "@/app/lib/schemas";

export const useCreatePerson = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Person>({
    resolver: zodResolver(personSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createPersonAction, { isLoading: createPersonIsLoading }] =
    useCreatePersonMutation();
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
    createPersonAction,
    createPersonIsLoading,
  };
};
