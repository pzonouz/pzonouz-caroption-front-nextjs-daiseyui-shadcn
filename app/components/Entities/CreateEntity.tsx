"use client";

import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { useCreateEntity } from "./hooks/useCreateEntity";
import { Entity } from "../../lib/schemas";
import {
  replaceWithPersianDigits,
  submitHandler,
  toggle,
} from "../../lib/utils";
import EntityForm from "./EntityForm";

export function CreateEntity({ entities }: { entities: Entity[] }) {
  const {
    open,
    setOpen,
    error,
    errors,
    createEntityIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createEntityAction,
  } = useCreateEntity();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد موجودیت</label>
        <EntityForm
          entities={entities}
          error={error}
          isLoading={createEntityIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Entity>({
            action: createEntityAction,
            handleSubmit,
            setError,
            reset,
            transform: (data) => ({
              ...data,
              priority: replaceWithPersianDigits(data.priority),
            }),
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
