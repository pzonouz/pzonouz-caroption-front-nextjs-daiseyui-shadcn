"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInvoiceMutation } from "@/app/lib/features/api";
import { Invoice, invoiceSchema } from "@/app/lib/schemas";

export const useCreateInvoice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createInvoiceAction, { isLoading: createInvoiceIsLoading }] =
    useCreateInvoiceMutation();
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
    createInvoiceAction,
    createInvoiceIsLoading,
  };
};
