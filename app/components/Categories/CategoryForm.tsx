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
import ImageUpload from "../Shared/ImageUpload";
import { Category, ParameterGroup } from "../../lib/schemas";
import { Combobox } from "../Shared/ComboBox";
import SelectBox from "../Shared/SelectBox";
import { useGetParameterGroupsQuery } from "@/app/lib/features/api";
import ImagesManager from "../Shared/ImageManager";
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
  const { data: allParameterGroups, isFetching: allParamaterGroupsIsFetching } =
    useGetParameterGroupsQuery();
  const parentId = watch("parentId")?.toString() ?? "";
  const updateParent = (parentId: string) => setValue("parentId", parentId);

  // Main Image
  const imageId = watch("imageId") ?? "";
  const updateImageId = (value: string) => setValue("imageId", value);

  // const parameterGroups = watch("parameter_groups", []);
  // const updateParameterGroups = (parameterGroups: ParameterGroup[]) =>
  //   setValue("parameter_groups", parameterGroups);

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
        error={errors?.name?.message?.toString()}
      />
      <FormField
        label="توضیح"
        title="description"
        register={register}
        error={errors?.description?.message?.toString()}
      />
      <FormField
        label="ترتیب"
        title="prioirity"
        register={register}
        error={errors?.prioirity?.message?.toString()}
      />
      <Combobox<Category>
        value={parentId}
        setValue={updateParent}
        array={categories}
        title="دسته بندی"
      />
      {/* <SelectBox<ParameterGroup> */}
      {/*   allItems={allParameterGroups} */}
      {/*   selectedItems={parameterGroups} */}
      {/*   setselectedItems={updateParameterGroups} */}
      {/* /> */}
      <FormField register={register} title="image_url" hidden />
      <ImagesManager
        type="One"
        selectedImageId={imageId}
        setSelectedImageId={updateImageId}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default CategoryForm;
