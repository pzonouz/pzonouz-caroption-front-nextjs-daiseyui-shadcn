"use client";
import { FormEventHandler } from "react";
import { FormField } from "../Shared/FormField";
import { replacePersianDigits } from "@/app/lib/utils";
import { LoadingButton } from "../Shared/LoadingButton";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Person } from "@/app/lib/schemas";
interface PersonFormProp {
  register: UseFormRegister<Person>;
  errors: FieldErrors<Person>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Person>;
  watch: UseFormWatch<Person>;
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
  const phoneValue = watch("phoneNumber", "");
  const updatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = replacePersianDigits(e.target.value);
    setValue("phoneNumber", replaced, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const addressValue = watch("address", "");
  const updateAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = replacePersianDigits(e.target.value);
    setValue("address", replaced, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <form
      lang="fa"
      className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
      onSubmit={submitHandler}
    >
      <FormField
        label="نام"
        title="firstName"
        register={register}
        error={errors?.firstName?.message}
      />
      <FormField
        label="نام خانوادگی"
        title="lastName"
        register={register}
        error={errors?.lastName?.message}
      />
      <FormField
        label="شماره تماس"
        title="phoneNumber"
        register={register}
        value={phoneValue}
        onChange={updatePhone}
        error={errors?.phoneNumber?.message}
      />
      <FormField
        label="آدرس"
        title="address"
        register={register}
        value={addressValue}
        onChange={updateAddress}
        error={errors?.address?.message}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};

export default PersonForm;
