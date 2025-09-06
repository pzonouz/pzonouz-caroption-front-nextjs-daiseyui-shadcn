"use client";

import { ParameterGroup } from "../../lib/schemas";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { submitHandler, toggle } from "../../lib/utils";
import { useCreateParameterGroup } from "./hooks/useCreateParameterGroup";
import ParameterGroupForm from "./ParameterGroupForm";

export function CreateParameterGroup() {
  const {
    open,
    setOpen,
    error,
    errors,
    createParameterGroupIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createParameterGroupAction,
  } = useCreateParameterGroup();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">
          ایجاد دسته بندی پارامترها
        </label>
        <ParameterGroupForm
          error={error}
          isLoading={createParameterGroupIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<ParameterGroup>({
            action: createParameterGroupAction,
            handleSubmit,
            setError,
            reset,
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
