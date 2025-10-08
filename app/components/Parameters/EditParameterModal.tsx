"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo } from "react";
import { Parameter } from "../../lib/schemas";
import { useAppDispatch } from "../../lib/hooks";
import { LoadingHide, LoadingShow } from "../../lib/features/LoadingSlice";
import { submitHandler } from "../../lib/utils";
import ParameterForm from "./ParameterForm";
import { useEditParameter } from "./hooks/useEditParameter";

const EditParameterModal = ({
  parameter,
  setParameter,
}: {
  parameter: Parameter | null | undefined;
  setParameter: React.Dispatch<
    React.SetStateAction<Parameter | null | undefined>
  >;
}) => {
  const normalizedParameter = useMemo(() => {
    if (!parameter) return undefined;
    return {
      ...parameter,
      id: parameter.id?.toString(),
      parameterGroupId: parameter.parameterGroupId?.toString(),
    };
  }, [parameter]);

  const {
    register,
    setError,
    error,
    watch,
    handleSubmit,
    setValue,
    errors,
    reset,
    editParameterIsLoading,
    editParameterAction,
  } = useEditParameter({ parameter: normalizedParameter });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editParameterIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [dispatch, editParameterIsLoading]);

  if (!parameter) return null;

  return (
    <dialog open className="modal w-full">
      <div className="modal-box w-full relative">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faClose}
            className="absolute text-error cursor-pointer top-4 right-4"
            onClick={() => {
              setParameter(undefined);
            }}
          />
          <label className=" text-3xl text-center w-5/6">ویرایش پارامتر</label>
          <ParameterForm
            submitHandler={submitHandler<Parameter>({
              action: editParameterAction,
              handleSubmit,
              setError,
              reset,
              setObject: setParameter,
            })}
            error={error}
            isLoading={editParameterIsLoading}
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

export default EditParameterModal;
