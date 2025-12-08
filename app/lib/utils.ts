import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorToast, SuccessToast } from "./Toasts";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { SetStateAction } from "react";

export const translate = (input: string): string => {
  switch (input?.trim()) {
    case "category with this name already exists.":
      return "نام دسته بندی تکراری است.";
    case "person with this phone already exists.":
      return "شماره موبایل قبلا ثبت شده است";
    case `ERROR: duplicate key value violates unique constraint "products_name_key" (SQLSTATE 23505)`:
      return "نام کالا تکراری است";
    default:
      return "خطای ترجمه";
  }
};
// export const translateRTKFetchBaseQueryErrors = (
//   error: FetchBaseQueryError
// ) => {
//   const errorData = error?.data as Record<string, string[]>;
//   let allMessages = null;
//   let output = null;
//   if (typeof errorData === "object") {
//     allMessages = Object?.values(errorData)?.flat();
//     output = allMessages?.reduce((pre, value) => {
//       return `${pre}\n${translate(value)}`;
//     }, "");
//   }
//   if (typeof errorData === "string") {
//     output = translate(errorData);
//   }
//   return output;
// };
export const translateRTKFetchBaseQueryErrors = (err: FetchBaseQueryError) => {
  const errorData = err?.data as Record<string, string[]> | string | undefined;
  let output: string | null = null;

  // --- handle status-based errors ---
  if (err.status === "PARSING_ERROR") {
    if (typeof err.originalStatus === "number") {
      switch (err.originalStatus) {
        case 400:
          if (
            typeof errorData === "string" &&
            containsAll(errorData, [
              "update or delete on table",
              "violates foreign key constraint",
            ])
          ) {
            return "امکان حذف به دلیل وجود وابستگی وجود ندارد";
          }
          break;
        case 401:
        case 403:
          return "دسترسی غیرمجاز";
        case 404:
          return "موردی یافت نشد";
        case 500:
          return "خطای داخلی سرور";
        case 502:
          return "ارتباط با سرور برقرار نشد";
        default:
          return `خطا با کد ${err.originalStatus}`;
      }
    }
  } else if (err.status === "CUSTOM_ERROR") {
    return "خطای سفارشی رخ داده است";
  }

  // --- handle validation errors ---
  if (typeof errorData === "object" && errorData !== null) {
    const allMessages = Object.values(errorData).flat();
    output = allMessages.reduce((pre, value) => {
      return `${pre}\n${translate(value)}`;
    }, "");
  } else if (typeof errorData === "string") {
    output = translate(errorData);
  }

  return output;
};

export const formatStringToCommaSeparatedNumber = (
  value: string | number | undefined
): string => {
  if (!value && value !== 0) return "";

  // convert to plain string
  let stringValue = value.toString();

  // remove commas, spaces, RTL/Persian direction marks, etc.
  stringValue = stringValue
    .replace(/[^\d]/g, "") // keep only digits
    .normalize("NFKD"); // normalize unicode digits

  // format from right to left into 3-digit groups
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const replacePersianDigits = (value: string | undefined): string => {
  if (!value) return "";

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return value.replace(/[۰-۹]/g, (char) => {
    const index = persianDigits.indexOf(char);
    return index !== -1 ? englishDigits[index] : char;
  });
};

export const replaceWithPersianDigits = (value: string | undefined): string => {
  if (!value) return "";

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return value.replace(/[0-9]/g, (char) => {
    const index = englishDigits.indexOf(char);
    return index !== -1 ? persianDigits[index] : char;
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
  reload?: (() => void) | null;
  setObject?: (obj: T | null) => void;
  transform?: (data: T) => T;
}
export function submitHandler<T extends FieldValues>({
  action,
  handleSubmit,
  setError,
  reset,
  reload = null,
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
        if (reload) reload();
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
  setOpen: React.Dispatch<SetStateAction<boolean>>
) => {
  open ? setOpen(false) : setOpen(true);
};

export const CreateSlug = (input: string) => {
  return input
    .normalize("NFKD") // normalize accents (e.g. "é" → "e")
    .replace(/[^\p{L}\p{N}\s]+/gu, "") // remove punctuation and symbols (keep letters, numbers, spaces)
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, "_") // replace spaces/tabs/newlines with underscores
    .toLowerCase(); // optional: make lowercase
};
export function containsAll(text: string, keywords: string[]): boolean {
  return keywords.every((k) => text.includes(k));
}

export const handleFetchErrors = (err: FetchBaseQueryError) => {
  if (err.status === "PARSING_ERROR") {
    if (typeof err.originalStatus === "number") {
      switch (err?.originalStatus) {
        case 400:
          if (
            containsAll(err?.data as string, [
              "update or delete on table",
              "violates foreign key constraint",
            ])
          ) {
            ErrorToast("امکان حذف به دلیل وجود وابستگی وجود ندارد");
            return;
          }
          break;
        case 401:
          ErrorToast("دسترسی غیرمجاز");
          break;
        case 403:
          ErrorToast("دسترسی غیرمجاز");
          break;
        case 404:
          ErrorToast("موردی یافت نشد");
          break;

        case 500:
          ErrorToast("خطای داخلی سرور");
          break;
        case 502:
          ErrorToast("ارتباط با سرور برقرار نشد");
          break;
        default:
          ErrorToast(`خطا با کد ${err.status}`);
      }
    }
  } else if (err.status === "CUSTOM_ERROR") {
    ErrorToast("خطای سفارشی رخ داده است");
  }
};
