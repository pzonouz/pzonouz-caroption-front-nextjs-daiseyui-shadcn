"use client";

import { Parameter } from "../../lib/schemas";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import { replacePersianDigits, submitHandler, toggle } from "../../lib/utils";
import { useCreateParameter } from "./hooks/useCreateParameter";
import ParameterForm from "./ParameterForm";

export function CreateParameter() {
  const {
    open,
    setOpen,
    error,
    errors,
    createParameterIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createParameterAction,
  } = useCreateParameter();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد پارامتر</label>
        <ParameterForm
          error={error}
          isLoading={createParameterIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Parameter>({
            action: createParameterAction,
            handleSubmit,
            setError,
            reset,
            transform: (data) => ({
              ...data,
              priority: replacePersianDigits(data.priority),
            }),
          })}
          errors={errors}
          register={register}
        />
      </CollapsibleSection>
    </div>
  );
}
