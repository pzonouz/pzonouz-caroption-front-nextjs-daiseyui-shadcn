"use client";
import { FormEventHandler } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ImageUpload from "../Shared/ImageUpload";
import { Entity } from "../../lib/schemas";
import { Combobox } from "../Shared/ComboBox";
interface EntityFormProp {
  register: UseFormRegister<Entity>;
  errors: FieldErrors<Entity>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Entity>;
  watch: UseFormWatch<Entity>;
  isLoading: boolean;
  error: string;
  entities: Entity[];
}

const EntityForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
  entities,
}: EntityFormProp) => {
  const imageUrl = watch("image_url");
  const updateImageUrl = (url: string) => setValue("image_url", url);

  const parent = watch("parent")?.toString() ?? "";
  const updateParent = (parentId: string) => setValue("parent", parentId);

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
        label="نام انگلیسی"
        title="english_name"
        register={register}
        error={errors?.english_name?.message?.toString()}
      />
      <FormField
        label="توضیح"
        title="description"
        register={register}
        error={errors?.description?.message?.toString()}
      />
      <FormField
        label="ترتیب"
        title="order"
        register={register}
        error={errors?.order?.message?.toString()}
      />
      <Combobox<Entity>
        value={parent}
        setValue={updateParent}
        array={entities}
        title="والد"
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
export default EntityForm;
