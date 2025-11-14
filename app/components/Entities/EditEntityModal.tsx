"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditEntity } from "./hooks/useEditEntity";
import EntityForm from "./EntityForm";
import React, { useEffect, useMemo } from "react";
import { Entity } from "../../lib/schemas";
import {
  useGetCategoriesQuery,
  useGetEntitiesQuery,
} from "../../lib/features/api";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { replaceWithPersianDigits, submitHandler } from "../../lib/utils";

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
  } = useEditEntity({ entity: entity });

  const { data: entities, isLoading } = useGetEntitiesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, dispatch]);

  if (!entity) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box w-full max-w-none h-screen p-6 relative rounded-none">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setEntity(undefined);
            }}
          />
          <label className="text-3xl text-center w-5/6">ویرایش موجودیت</label>

          <EntityForm
            submitHandler={submitHandler<Entity>({
              action: editEntityAction,
              handleSubmit,
              setError,
              reset,
              setObject: setEntity,
              transform: (data) => ({
                ...data,
                priority: replaceWithPersianDigits(data.priority),
              }),
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
