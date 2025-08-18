"use client";
import { FormEventHandler } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import { FieldErrors } from "react-hook-form";
import ImageUpload from "../Shared/ImageUpload";
import { Category } from "@/app/lib/schemas";
export interface CategoryFormValues {
  name: string;
  image_url: string;
  description: string;
  order: string;
  parent: string;
}
interface CategoryFormProp {
  register: Function;
  errors: FieldErrors<CategoryFormValues>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: Function;
  watch: Function;
  isLoading: boolean;
  error: string;
  control: any;
  getValues: Function;
  categories: Category[];
}

const CategoryForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
  categories,
}: CategoryFormProp) => {
  const imageUrl = watch("image_url");

  const updateImageUrl = (url: string) => setValue("image_url", url);
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
        label="توضیح"
        title="description"
        register={register}
        error={errors?.description?.message}
      />
      <FormField
        label="ترتیب"
        title="order"
        register={register}
        error={errors?.order?.message}
      />
      <FormField register={register} title="image_url" hidden />
      <ImageUpload imageUrl={imageUrl} setImageUrl={updateImageUrl} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default CategoryForm;
