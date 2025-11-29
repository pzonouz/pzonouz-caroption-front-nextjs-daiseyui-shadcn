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
import { Category } from "../../lib/schemas";
import { Combobox } from "../Shared/ComboBox";
import ImagesManager from "../Shared/ImageManager";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateSlug } from "@/app/lib/utils";
interface CategoryFormProp {
  register: UseFormRegister<Category>;
  errors: FieldErrors<Category>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Category>;
  watch: UseFormWatch<Category>;
  isLoading: boolean;
  error: string;
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
  const parentId = watch("parentId")?.toString() ?? "";
  const updateParent = (parentId: string) => setValue("parentId", parentId);

  useEffect(() => {
    setValue("slug", CreateSlug(watch("name")), {});
  }, [setValue, watch("name")]);

  // Main Image
  const imageId = watch("imageId") ?? "";
  const updateImageId = (value: string) => setValue("imageId", value);

  // Show
  const show = watch("show") ?? "";
  const updateShow = (value: boolean) => setValue("show", value);

  // Generator
  const generator = watch("generator") ?? "";
  const updateGenerator = (value: boolean) => setValue("generator", value);

  useEffect(() => {
    setValue("slug", CreateSlug(watch("name")), {});
  }, [setValue, watch]);
  return (
    <form
      lang="fa"
      onSubmit={submitHandler}
      className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-6"
    >
      {/* ImageManager — left on md+, top on mobile */}
      <div className="order-1 md:order-1 flex justify-center md:justify-start w-full">
        <div className="w-full md:w-[90%]">
          <ImagesManager
            className="w-full"
            type="One"
            selectedImageId={imageId}
            setSelectedImageId={updateImageId}
          />
        </div>
      </div>
      {/* Form fields — right on md+, bottom on mobile */}
      <div className="order-2 md:order-2 flex flex-col gap-4 w-full">
        <FormField
          label="نام"
          title="name"
          register={register}
          error={errors?.name?.message?.toString()}
        />

        <FormField
          label="مسیر"
          title="slug"
          register={register}
          error={errors?.slug?.message?.toString()}
        />
        <FormField
          label="توضیح"
          title="description"
          register={register}
          error={errors?.description?.message?.toString()}
        />
        <FormField
          label="ترتیب"
          title="priority"
          register={register}
          error={errors?.priority?.message?.toString()}
        />
        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            disabled={watch("generated")}
            checked={show}
            onCheckedChange={updateShow}
          />
          <p>نمایش</p>
        </div>
        {!parentId && (
          <div className="flex flex-row gap-4 items-center">
            <Checkbox checked={generator} onCheckedChange={updateGenerator} />
            <p>تولید کننده</p>
          </div>
        )}
        <Combobox<Category>
          value={parentId}
          setValue={updateParent}
          array={categories}
          title="دسته بندی"
        />
        <FormField register={register} title="image_url" hidden />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <LoadingButton className="btn btn-primary" isLoading={isLoading}>
          ثبت
        </LoadingButton>
      </div>
    </form>
  );
};
export default CategoryForm;
