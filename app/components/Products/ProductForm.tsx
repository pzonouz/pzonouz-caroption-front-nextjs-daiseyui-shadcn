"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import { FieldErrors } from "react-hook-form";
import ImageUpload from "../Shared/ImageUpload";
import { Category } from "@/app/lib/schemas";
import Tiptop from "../Shared/Tiptop";
export interface ProductFormValues {
  name: string;
  image_url: string;
  description: string;
  info: string;
  parent: string;
}
interface ProductFormProp {
  register: Function;
  errors: FieldErrors<ProductFormValues>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: Function;
  watch: Function;
  isLoading: boolean;
  error: string;
  control: any;
  getValues: Function;
  categories: Category[];
}

const ProductForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  getValues,
  categories,
}: ProductFormProp) => {
  //Image
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (getValues("image_url")) setImageUrl(getValues("image_url"));
  }, [getValues("image_url")]);

  useEffect(() => {
    const currentFormImage = getValues("image_url");
    if (imageUrl && imageUrl !== currentFormImage) {
      setValue("image_url", imageUrl);
    }
  }, [imageUrl, getValues]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
        label="توضیح کوتاه"
        title="info"
        register={register}
        error={errors?.info?.message}
      />
      <Tiptop state={description} setState={setDescription} />
      <FormField register={register} title="image_url" hidden />
      <FormField register={register} title="description" hidden />
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default ProductForm;
