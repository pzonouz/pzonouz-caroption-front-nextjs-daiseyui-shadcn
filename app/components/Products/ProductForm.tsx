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
import Tiptop from "../Shared/Tiptop";
import { Brand, Category, Product } from "../../lib/schemas";
import {
  formatStringToCommaSeparatedNumber,
  replacePersianDigits,
} from "../../lib/utils";
import { Combobox } from "../Shared/ComboBox";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
} from "@/app/lib/features/api";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleImageUpload from "../Shared/MultipleImageUpload";
interface ProductFormProp {
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

  // Description
  const description = watch("description") ?? "";
  const updateDescription = (value: string) => setValue("description", value);

  // Image
  const imageUrl = watch("image_url") ?? "";
  const updateImageUrl = (value: string) => setValue("image_url", value);

  // Images
  const imageUrls = watch("image_urls") ?? [];
  const updateImageUrls = (value: string[]) => setValue("image_urls", value);

  //Price
  const price = watch("price") ?? "";
  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("price", replaced, { shouldValidate: true, shouldDirty: true });
  };

  //Count
  const count = watch("count") ?? "";
  const updateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const replaced = formatStringToCommaSeparatedNumber(
      replacePersianDigits(e.target.value),
    );
    setValue("count", replaced, { shouldValidate: true, shouldDirty: true });
  };

  // Category
  const category = watch("generated")
    ? (watch("main_product")?.category?.toString() ?? "")
    : (watch("category")?.toString() ?? "");
  const updateCategory = (catgoryId: string) => setValue("category", catgoryId);

  // Brand
  const brand = watch("generated")
    ? (watch("main_product")?.brand?.toString() ?? "")
    : (watch("brand")?.toString() ?? "");
  const updateBrand = (brandId: string) => setValue("brand", brandId);

  // Generatable
  const generatable = watch("generatable") ?? false;
  const updateGeneratable = (value: boolean | "indeterminate") =>
    setValue("generatable", value === true, { shouldValidate: true });
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
        label="توضیح کوتاه"
        title="info"
        register={register}
        error={errors?.info?.message?.toString()}
      />
      <Tiptop state={description} setState={updateDescription} />
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
      <FormField register={register} title="image_url" hidden />
      <FormField register={register} title="description" hidden />
      <div className="flex flex-row gap-4 items-center">
        <Checkbox
          disabled={watch("generated")}
          checked={generatable}
          onCheckedChange={updateGeneratable}
        />
        <p>بازتولید</p>
      </div>
      <Combobox<Brand>
        value={brand}
        setValue={updateBrand}
        array={brands ?? []}
        title="برند"
        disabled={watch("generated")}
      />
      <Combobox<Category>
        value={category}
        setValue={updateCategory}
        array={categories ?? []}
        title="دسته بندی"
        disabled={watch("generated")}
      />
      <ImageUpload imageUrl={imageUrl} setImageUrl={updateImageUrl} />
      <MultipleImageUpload
        parentId={watch("id")?.toString()}
        imageUrls={imageUrls}
        setImageUrls={updateImageUrls}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoadingButton className="btn btn-primary" isLoading={isLoading}>
        ثبت
      </LoadingButton>
    </form>
  );
};
export default ProductForm;
