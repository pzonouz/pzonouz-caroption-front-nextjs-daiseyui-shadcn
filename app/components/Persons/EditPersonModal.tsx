"use client";

import { Person } from "@/app/lib/schemas";
import { submitHandler } from "@/app/lib/utils";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonForm, { PersonFormValues } from "./PersonForm";
import { useEditPerson } from "./Hooks/useEditPerson";

const EditPersonModal = ({
  person,
  setPerson,
}: {
  person: Person | undefined;
  setPerson: Function;
}) => {
  if (!person) return null;
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editPersonIsLoading,
    editPersonAction,
  } = useEditPerson({ person: person });
  return (
    person && (
      <dialog open className="modal w-full">
        <div className="modal-box w-full relative">
          <div className="modal-action w-full flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute text-error cursor-pointer top-4 right-4"
              onClick={() => {
                setPerson(null);
              }}
            />
            <label className=" text-3xl text-center w-5/6">
              ویرایش طرف حساب
            </label>
            <PersonForm
              submitHandler={submitHandler<PersonFormValues>({
                action: editPersonAction,
                handleSubmit,
                setError,
                reset,
                setObject: setPerson,
              })}
              error={error}
              isLoading={editPersonIsLoading}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>
      </dialog>
    )
  );
};

export default EditPersonModal;
