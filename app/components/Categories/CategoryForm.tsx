"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { FormField } from "../Shared/FormField";
import { replacePersianDigits } from "@/app/lib/utils";
import { LoadingButton } from "../Shared/LoadingButton";
import { FieldErrors } from "react-hook-form";
import ImageUpload from "../Shared/ImageUpload";
import { DevTool } from "@hookform/devtools";
import { Category } from "@/app/lib/schemas";
import { SearchableCombobox } from "../Shared/SearchableCombobox";
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
  categories: Category[];
}

const CategoryForm = ({
  register,
  errors,
  submitHandler,
  watch,
  setValue,
  isLoading,
  error,
  control,
  categories,
}: CategoryFormProp) => {
  //Order
  const orderValue = watch("order", "");
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = replacePersianDigits(e.target.value);
    setValue("order", replaced, { shouldValidate: true, shouldDirty: true });
  };
  useEffect(() => {
    setValue("order", "1");
  }, []);

  //Image
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (imageUrl) {
      setValue("image_url", imageUrl);
    }
  }, [imageUrl]);

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
        value={orderValue}
        onChange={handleOrderChange}
      />
      <FormField register={register} title="image_url" hidden />
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <DevTool control={control} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default CategoryForm;
