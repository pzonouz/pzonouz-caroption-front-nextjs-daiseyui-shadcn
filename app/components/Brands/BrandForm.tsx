"use client";
import { FormEventHandler, useEffect } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Brand } from "@/app/lib/schemas";
interface BrandFormProp {
  register: UseFormRegister<Brand>;
  errors: FieldErrors<Brand>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Brand>;
  watch: UseFormWatch<Brand>;
  isLoading: boolean;
  error: string;
}

const BrandForm = ({
  register,
  errors,
  submitHandler,
  isLoading,
  error,
}: BrandFormProp) => {
  return (
    <form
      lang="fa"
      className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
      onSubmit={submitHandler}
    >
      <FormField
        label="نام"
        title="name"
        register={register}
        error={errors?.name?.message}
      />
      <FormField
        label="توضیحات"
        title="description"
        register={register}
        error={errors?.description?.message}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};

export default BrandForm;
