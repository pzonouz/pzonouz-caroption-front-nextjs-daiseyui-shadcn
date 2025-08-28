"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditEntity } from "./hooks/useEditEntity";
import EntityForm from "./EntityForm";
import React, { useEffect } from "react";
import { Entity } from "../../lib/schemas";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { submitHandler } from "../../lib/utils";
import { useGetEntitiesQuery } from "@/app/lib/features/api";

const EditEntityModal = ({
  entity,
  setEntity,
}: {
  entity: Entity | null | undefined;
  setEntity: React.Dispatch<React.SetStateAction<Entity | null | undefined>>;
}) => {
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editEntityIsLoading,
    editEntityAction,
  } = useEditEntity({ entity });

  const { data: entities, isLoading } = useGetEntitiesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(watch("parent"));
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if (isLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, dispatch]);

  if (!entity) return null;

  return (
    <dialog open className="modal w-full">
      <div className="modal-box w-full relative">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setEntity(undefined);
            }}
          />
          <label className=" text-3xl text-center w-5/6">ویرایش موجودیت</label>
          <EntityForm
            submitHandler={submitHandler<Entity>({
              action: editEntityAction,
              handleSubmit,
              setError,
              reset,
              setObject: setEntity,
            })}
            error={error}
            isLoading={editEntityIsLoading}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            entities={entities ?? []}
          />
        </div>
      </div>
    </dialog>
  );
};

export default EditEntityModal;
