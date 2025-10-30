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
import Tiptop from "../Shared/Tiptop";
import { Category, Article } from "../../lib/schemas";
import { CreateSlug } from "../../lib/utils";
import { Combobox } from "../Shared/ComboBox";
import { useGetCategoriesQuery } from "@/app/lib/features/api";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import ImagesManager from "../Shared/ImageManager";
import TagsInput from "../Shared/TagsInput";
import { Checkbox } from "@/components/ui/checkbox";

export interface ArticleFormProp {
  register: UseFormRegister<Article>;
  errors: FieldErrors<Article>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Article>;
  watch: UseFormWatch<Article>;
  isLoading: boolean;
  error: string;
}

const ArticleForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
}: ArticleFormProp) => {
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

  useEffect(() => {
    setValue("slug", CreateSlug(watch("name")), {});
  }, [watch("name")]);

  // Description
  const description = watch("description") ?? "";
  const updateDescription = (value: string) => setValue("description", value);

  // Main Image
  const imageId = watch("imageId") ?? "";
  const updateImageId = (value: string) => setValue("imageId", value);

  // Category
  const categoryId = watch("categoryId")?.toString() ?? "";
  const updateCategoryId = (categoryId: string) =>
    setValue("categoryId", categoryId);

  // Tags
  const keywords = watch("keywords") ?? [];
  const updateKeywords = (keywords: string[]) => setValue("keywords", keywords);

  const showInProducts = watch("showInProducts") ?? false;
  const updateShowInProducts = (value: boolean) =>
    setValue("showInProducts", value === true, { shouldValidate: true });

  return (
    <form
      lang="fa"
      onSubmit={submitHandler}
      className="w-full mt-10 grid grid-cols-1 items-start gap-6 mb-6"
    >
      {/* Left side (Images on md+), bottom on mobile */}
      <div className="order-1 md:order-1 flex flex-col gap-4 w-full md:w-[90%]">
        <ImagesManager
          type="One"
          selectedImageId={imageId}
          setSelectedImageId={updateImageId}
        />
      </div>

      {/* Right side (Form fields), top on mobile */}
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
        <Tiptop
          className=""
          state={description}
          setStateAction={updateDescription}
        />
        <TagsInput
          title="کلمات کلیدی"
          tags={keywords}
          setTags={updateKeywords}
        />
        <FormField register={register} title="description" hidden />

        <Combobox<Category>
          value={categoryId}
          setValue={updateCategoryId}
          array={categories?.filter((c: Category) => c?.parentId != null) ?? []}
          title="دسته بندی"
          disabled={watch("generated")}
        />
        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            checked={showInProducts}
            onCheckedChange={updateShowInProducts}
          />
          <p>نمایش در محصولات</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <LoadingButton className="btn btn-primary" isLoading={isLoading}>
          ثبت
        </LoadingButton>
      </div>
    </form>
  );
};

export default ArticleForm;
