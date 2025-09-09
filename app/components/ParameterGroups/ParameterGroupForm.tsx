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
import { Category, ParameterGroup } from "../../lib/schemas";
import { Combobox } from "../Shared/ComboBox";
import { useGetCategoriesQuery } from "@/app/lib/features/api";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
interface ParameterGroupFormProp {
  register: UseFormRegister<ParameterGroup>;
  errors: FieldErrors<ParameterGroup>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<ParameterGroup>;
  watch: UseFormWatch<ParameterGroup>;
  isLoading: boolean;
  error: string;
}

const ParameterGroupForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
}: ParameterGroupFormProp) => {
  const dispatch = useAppDispatch();
  const { data: categories, isFetching: categoryIsLoading } =
    useGetCategoriesQuery();

  useEffect(() => {
    if (isLoading || categoryIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, categoryIsLoading, dispatch]);

  // Category
  const category = watch("category")?.toString() ?? "";
  const updateCategory = (catgoryId: string) => setValue("category", catgoryId);

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
        error={errors?.name?.message?.toString()}
      />
      <Combobox<Category>
        array={categories ?? []}
        title=""
        value={category}
        setValue={updateCategory}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default ParameterGroupForm;
