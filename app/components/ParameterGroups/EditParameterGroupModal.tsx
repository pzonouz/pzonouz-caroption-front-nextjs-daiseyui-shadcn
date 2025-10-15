"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParameterGroupForm from "./ParameterGroupForm";
import React, { useEffect, useMemo } from "react";
import { ParameterGroup } from "../../lib/schemas";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { submitHandler } from "../../lib/utils";
import { useEditParameterGroup } from "./hooks/useEditParameter";

const EditParameterGroupModal = ({
  parameterGroup,
  setParameterGroup,
}: {
  parameterGroup: ParameterGroup | null | undefined;
  setParameterGroup: React.Dispatch<
    React.SetStateAction<ParameterGroup | null | undefined>
  >;
}) => {
  const normalizedParameterGroup = useMemo(
    () =>
      parameterGroup
        ? {
            ...parameterGroup,
            categoryId: parameterGroup.categoryId?.toString() ?? "",
          }
        : undefined,
    [parameterGroup],
  );
  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editParameterGroupIsLoading,
    editParameterGroupAction,
  } = useEditParameterGroup({ parameterGroup: normalizedParameterGroup });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editParameterGroupIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [dispatch, editParameterGroupIsLoading]);

  if (!parameterGroup) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box w-full h-screen max-w-none p-6 relative rounded-none flex flex-col">
        <FontAwesomeIcon
          icon={faClose}
          className="absolute text-error cursor-pointer top-4 right-4"
          onClick={() => {
            setParameterGroup(undefined);
          }}
        />

        <label className="text-3xl text-center mb-6 mt-2">ویرایش کالا</label>

        <div className="flex-1 overflow-y-auto w-full">
          <ParameterGroupForm
            submitHandler={submitHandler<ParameterGroup>({
              action: editParameterGroupAction,
              handleSubmit,
              setError,
              reset,
              setObject: setParameterGroup,
              transform: (data) => ({
                ...data,
                categoryId: data?.categoryId?.toString(),
              }),
            })}
            error={error}
            isLoading={editParameterGroupIsLoading}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        </div>
      </div>
    </dialog>
  );
};

export default EditParameterGroupModal;
