import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SuccessToast } from "./Toasts";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { SetStateAction } from "react";

export const translate = (input: string): string => {
  switch (input?.trim()) {
    case "category with this name already exists.":
      return "نام دسته بندی تکراری است.";
    case "person with this phone already exists.":
      return "شماره موبایل قبلا ثبت شده است";
    default:
      return "خطای ترجمه";
  }
};
export const translateRTKFetchBaseQueryErrors = (
  error: FetchBaseQueryError,
) => {
  const errorData = error?.data as Record<string, string[]>;
  const allMessages = Object?.values(errorData)?.flat();
  const output = allMessages?.reduce((pre, value) => {
    return `${pre}\n${translate(value)}`;
  }, "");
  return output;
};

export const formatStringToCommaSeparatedNumber = (
  value: string | number | undefined,
): string => {
  if (!value && value !== 0) return "";
  const stringValue = value.toString();
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const replacePersianDigits = (value: string | undefined): string => {
  value = value?.replace(/\D/g, "");
  if (!value) return "";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return value.replace(/[۰-۹]/g, (char) => {
    return englishDigits[persianDigits.indexOf(char)];
  });
};

export const formatDate = (date: string | Date): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("fa-IR");
};

interface SubmitHandlerProps<T extends FieldValues> {
  action: (arg: T) => { unwrap: () => Promise<any> };
  handleSubmit: UseFormHandleSubmit<T>;
  setError: (error: string) => void;
  reset?: () => void;
  setObject?: (obj: T | null) => void;
  transform?: (data: T) => T;
}
export function submitHandler<T extends FieldValues>({
  action,
  handleSubmit,
  setError,
  reset,
  setObject,
  transform,
}: SubmitHandlerProps<T>) {
  return handleSubmit((data: T) => {
    const transformedData = transform ? transform(data) : data;
    action(transformedData)
      .unwrap()
      .then(() => {
        setError("");
        if (reset) reset();
        SuccessToast();
        if (setObject) setObject(null);
      })
      .catch((err: FetchBaseQueryError) => {
        setError(translateRTKFetchBaseQueryErrors(err));
      });
  });
}
export const toggle = (
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>,
) => {
  open ? setOpen(false) : setOpen(true);
};
