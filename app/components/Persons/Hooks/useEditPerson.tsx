"use client";
import { useEditPersonMutation } from "@/app/lib/features/api";
import { Person, personSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditPerson({ person }: { person: Person | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Person>({ resolver: zodResolver(personSchema) });

  useEffect(() => {
    if (person) {
      reset(person);
    }
  }, [person]);

  const [error, setError] = useState("");
  const [editPersonAction, { isLoading: editPersonIsLoading }] =
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
    editPersonAction,
    editPersonIsLoading,
  };
}
