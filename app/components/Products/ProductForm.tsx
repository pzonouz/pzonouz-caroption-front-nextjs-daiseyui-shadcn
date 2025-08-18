"use client";
import { FormEventHandler, useState } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import { FieldErrors } from "react-hook-form";
import ImageUpload from "../Shared/ImageUpload";
import { Category } from "@/app/lib/schemas";
import Tiptop from "../Shared/Tiptop";
import {
  formatStringToCommaSeparatedNumber,
  replacePersianDigits,
} from "@/app/lib/utils";
export interface ProductFormValues {
  name: string;
  image_url: string;
  description: string;
  info: string;
  price: string;
  count: string;
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
  categories: Category[];
}

const ProductForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  categories,
  watch,
}: ProductFormProp) => {
  // Image
  const imageUrl = watch("image_url");
  const [description, setDescription] = useState("");
  const updateImageUrl = (url: string) => setValue("image_url", url);

  //Price
  const price = watch("price");
  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("price", replaced, { shouldValidate: true, shouldDirty: true });
  };

  //Count
  const count = watch("count");
  const updateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("count", replaced, { shouldValidate: true, shouldDirty: true });
  };

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
      <FormField
        label="قیمت"
        title="price"
        value={price}
        onChange={updatePrice}
        register={register}
        error={errors?.price?.message}
      />
      <FormField
        label="تعداد"
        title="count"
        value={count}
        onChange={updateCount}
        register={register}
        error={errors?.count?.message}
      />
      <FormField register={register} title="image_url" hidden />
      <FormField register={register} title="description" hidden />
      <ImageUpload imageUrl={imageUrl} setImageUrl={updateImageUrl} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default ProductForm;
