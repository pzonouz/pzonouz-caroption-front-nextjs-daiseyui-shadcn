"use client";

import { submitHandler, toggle } from "@/app/lib/utils";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
import PersonForm from "./PersonForm";
import { useCreatePerson } from "./Hooks/useCreatePerson";
import { Person } from "@/app/lib/schemas";

export function CreatePerson() {
  const {
    open,
    setOpen,
    error,
    errors,
    createPersonIsLoading,
    watch,
    setValue,
    register,
    reset,
    setError,
    handleSubmit,
    createPersonAction,
  } = useCreatePerson();
  return (
    <div className="w-full flex flex-col items-center justify-center  relative">
      <CollapsibleSection
        className="w-full"
        isOpen={open}
        onToggle={() => toggle(open, setOpen)}
      >
        <label className=" text-3xl text-center w-5/6">ایجاد طرف حساب</label>
        <PersonForm
          error={error}
          isLoading={createPersonIsLoading}
          watch={watch}
          setValue={setValue}
          submitHandler={submitHandler<Person>({
            action: createPersonAction,
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
