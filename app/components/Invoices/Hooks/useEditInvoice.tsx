"use client";
import { useEditInvoiceMutation } from "@/app/lib/features/api";
import { Invoice, invoiceSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditInvoice({ invoice }: { invoice: Invoice | undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Invoice>({ resolver: zodResolver(invoiceSchema) });

  useEffect(() => {
    if (invoice) {
      reset(invoice);
    }
  }, [invoice, reset]);

  const [error, setError] = useState("");
  const [editInvoiceAction, { isLoading: editInvoiceIsLoading }] =
    useEditInvoiceMutation();

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    error,
    setError,
    editInvoiceAction,
    editInvoiceIsLoading,
  };
}
