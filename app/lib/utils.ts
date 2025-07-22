export const formatStringToCommaSepratedNumber = (value: string) => {
  const str = String(value || "");
  const num = str.replace(/,/g, "").replace(/\D/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export function replacePersianDigits(str: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str?.replace(/[۰-۹]/g, (d) => {
    const index = persianDigits.indexOf(d);
    return index >= 0 ? index.toString() : d;
  });
}
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
