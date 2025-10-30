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
import { Brand, Category, Product } from "../../lib/schemas";
import {
  CreateSlug,
  formatStringToCommaSeparatedNumber,
  replacePersianDigits,
} from "../../lib/utils";
import { Combobox } from "../Shared/ComboBox";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetParametersByCategoryQuery,
} from "@/app/lib/features/api";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { Checkbox } from "@/components/ui/checkbox";
import ParameterValues from "../Shared/ParameterValues";
import ImagesManager from "../Shared/ImageManager";
import TagsInput from "../Shared/TagsInput";

export interface ProductFormProp {
  register: UseFormRegister<Product>;
  errors: FieldErrors<Product>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Product>;
  watch: UseFormWatch<Product>;
  isLoading: boolean;
  error: string;
}

const ProductForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
}: ProductFormProp) => {
  const dispatch = useAppDispatch();
  const { data: categories, isFetching: categoryIsLoading } =
    useGetCategoriesQuery();
  const { data: brands, isFetching: brandIsLoading } = useGetBrandsQuery();

  useEffect(() => {
    if (isLoading || categoryIsLoading || brandIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, categoryIsLoading, dispatch, brandIsLoading]);

  useEffect(() => {
    setValue("slug", CreateSlug(watch("name")), {});
  }, [watch("name")]);

  // Description
  const description = watch("description") ?? "";
  const updateDescription = (value: string) => setValue("description", value);

  // Main Image
  const imageId = watch("imageId") ?? "";
  const updateImageId = (value: string) => setValue("imageId", value);

  // Multiple Images
  const imageIds = watch("imageIds") ?? [];
  const updateImageIds = (value: string[]) =>
    setValue("imageIds", value, { shouldValidate: true });
  // Price
  const price = watch("price") ?? "";
  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("price", replaced, { shouldValidate: true, shouldDirty: true });
  };

  // Count
  const count = watch("count") ?? "";
  const updateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("count", replaced, { shouldValidate: true, shouldDirty: true });
  };

  // Category
  const categoryId = watch("generated")
    ? (watch("main_product")?.category?.toString() ?? "")
    : (watch("categoryId")?.toString() ?? "");
  const updateCategoryId = (categoryId: string) =>
    setValue("categoryId", categoryId);

  // Tags
  const keywords = watch("keywords") ?? [];
  const updateKeywords = (keywords: string[]) => setValue("keywords", keywords);

  // Show
  const show = watch("show") ?? false;
  const updateShow = (show: boolean) => setValue("show", show);

  // Brand
  const brandId = watch("generated")
    ? (watch("main_product")?.brand?.toString() ?? "")
    : (watch("brandId")?.toString() ?? "");
  const updateBrandId = (brandId: string) => setValue("brandId", brandId);

  // Generatable
  const generatable = watch("generatable") ?? false;
  const updateGeneratable = (value: boolean | "indeterminate") =>
    setValue("generatable", value === true, { shouldValidate: true });

  const { data: parameters, isFetching: parametersIsLoading } =
    useGetParametersByCategoryQuery(categoryId);
  return (
    <form
      lang="fa"
      onSubmit={submitHandler}
      className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 items-start gap-6 mb-6"
    >
      {/* Left side (Images on md+), bottom on mobile */}
      <div className="order-1 md:order-1 flex flex-col gap-4 w-full md:w-[90%]">
        <ImagesManager
          type="One"
          selectedImageId={imageId}
          setSelectedImageId={updateImageId}
        />
        <ImagesManager
          type="Multiple"
          selectedImageIds={imageIds}
          setSelectedImageIds={updateImageIds}
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
        <FormField
          label="توضیح کوتاه"
          title="info"
          register={register}
          error={errors?.info?.message?.toString()}
        />
        <TagsInput
          title="کلمات کلیدی"
          tags={keywords}
          setTags={updateKeywords}
        />
        <Tiptop state={description} setStateAction={updateDescription} />
        <FormField
          label="قیمت"
          title="price"
          value={price}
          onChange={updatePrice}
          register={register}
          error={errors?.price?.message?.toString()}
        />
        <FormField
          label="تعداد"
          title="count"
          value={count}
          onChange={updateCount}
          register={register}
          error={errors?.count?.message?.toString()}
        />
        <FormField register={register} title="description" hidden />

        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            disabled={watch("generated")}
            checked={generatable}
            onCheckedChange={updateGeneratable}
          />
          <p>بازتولید</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox checked={show} onCheckedChange={updateShow} />
          <p>نمایش</p>
        </div>

        <Combobox<Brand>
          value={brandId}
          setValue={updateBrandId}
          array={brands ?? []}
          title="برند"
          disabled={watch("generated")}
        />
        <Combobox<Category>
          value={categoryId}
          setValue={updateCategoryId}
          array={categories?.filter((c: Category) => c?.parentId != null) ?? []}
          title="دسته بندی"
          disabled={watch("generated")}
        />

        <ParameterValues
          watch={watch}
          parameters={parameters}
          register={register}
          setValue={setValue}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        <LoadingButton className="btn btn-primary" isLoading={isLoading}>
          ثبت
        </LoadingButton>
      </div>
    </form>
  );
};

export default ProductForm;
