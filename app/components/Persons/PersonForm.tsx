"use client";
import { FormEventHandler } from "react";
import { FormField } from "../Shared/FormField";
import { replacePersianDigits } from "@/app/lib/utils";
import { LoadingButton } from "../Shared/LoadingButton";
import { FieldErrors } from "react-hook-form";
export interface PersonFormValues {
  firstname: string;
  lastname: string;
  phone: string;
}
interface PersonFormProp {
  register: Function;
  errors: FieldErrors<PersonFormValues>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: Function;
  watch: Function;
  isLoading: boolean;
  error: string;
}

const PersonForm = ({
  register,
  errors,
  submitHandler,
  watch,
  setValue,
  isLoading,
  error,
}: PersonFormProp) => {
  const phoneValue = watch("phone", "");
  const updatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = replacePersianDigits(e.target.value);
    setValue("phone", replaced, { shouldValidate: true, shouldDirty: true });
  };
  return (
    <form
      lang="fa"
      className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
      onSubmit={submitHandler}
    >
      <FormField
        label="نام"
        title="firstname"
        register={register}
        error={errors?.firstname?.message}
      />
      <FormField
        label="نام خانوداگی"
        title="lastname"
        register={register}
        error={errors?.lastname?.message}
      />
      <FormField
        label="شماره تماس"
        title="phone"
        register={register}
        value={phoneValue}
        onChange={updatePhone}
        error={errors?.phone?.message}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};

export default PersonForm;
