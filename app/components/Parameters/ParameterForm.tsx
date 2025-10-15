"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { FormField } from "../Shared/FormField";
import { LoadingButton } from "../Shared/LoadingButton";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Parameter } from "../../lib/schemas";
import { Combobox } from "../Shared/ComboBox";
import { useGetParameterGroupsQuery } from "@/app/lib/features/api";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";
import { CollapsibleSection } from "../Shared/CollapsibleSection";
interface ParameterFormProp {
  register: UseFormRegister<Parameter>;
  errors: FieldErrors<Parameter>;
  submitHandler: FormEventHandler<HTMLFormElement>;
  setValue: UseFormSetValue<Parameter>;
  watch: UseFormWatch<Parameter>;
  isLoading: boolean;
  error: string;
}

const ParameterForm = ({
  register,
  errors,
  submitHandler,
  setValue,
  isLoading,
  error,
  watch,
}: ParameterFormProp) => {
  const dispatch = useAppDispatch();
  const { data: parameterGroups, isFetching: parameterGroupsIsLoading } =
    useGetParameterGroupsQuery();

  useEffect(() => {
    if (isLoading || parameterGroupsIsLoading) {
      dispatch(LoadingShow());
    } else {
      dispatch(LoadingHide());
    }
  }, [isLoading, parameterGroupsIsLoading, dispatch]);

  const parameterGroup = watch("parameterGroupId")?.toString() ?? "";
  const updateParameterGroup = (groupId: string) =>
    setValue("parameterGroupId", groupId?.toString());

  const type = watch("type")?.toString() ?? "";
  const updateType = (value: string) => setValue("type", value);

  const selectableValues = watch("selectables") ?? [];
  const updateSelectableValues = (value: string[]) =>
    setValue("selectables", value);

  const [selectableValue, setSelectableValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  return (
    <form
      lang="fa"
      className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
      onSubmit={submitHandler}
    >
      <FormField
        label="نام"
        title="name"
        register={register}
        error={errors?.name?.message?.toString()}
        className="col-span-2 md:col-span-1"
      />

      {/* Group + Type in one column on small, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 col-span-2">
        <Combobox
          array={parameterGroups ?? []}
          value={parameterGroup}
          setValue={updateParameterGroup}
          title="گروه"
        />
        <Combobox
          title="نوع"
          value={type}
          setValue={updateType}
          array={[
            { id: "TX", name: "متن" },
            { id: "SL", name: "قابل انتخاب" },
            { id: "BL", name: "بله-خیر" },
          ]}
        />
      </div>

      {type == "SL" && (
        <div className="col-span-2">
          <CollapsibleSection
            isOpen={open}
            onToggle={(e: React.SyntheticEvent) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <div className="flex flex-row items-center gap-2">
              <input
                value={selectableValue}
                onChange={(e) => setSelectableValue(e.currentTarget.value)}
                type="text"
                className="input"
              />
              <button
                className="btn btn-primary"
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  if (selectableValues.includes(selectableValue)) return;
                  updateSelectableValues([
                    ...selectableValues,
                    selectableValue,
                  ]);
                }}
              >
                اضافه کردن
              </button>
            </div>
            <div className="p-2">
              {selectableValues.map((item) => (
                <div
                  className="flex justify-between items-center py-2"
                  key={item}
                >
                  <div>{item}</div>
                  <div
                    className="btn btn-error text-white"
                    onClick={() => {
                      updateSelectableValues(
                        selectableValues.filter((i) => i != item),
                      );
                    }}
                  >
                    حذف
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      )}

      {error && <p className="text-sm text-red-500 col-span-2">{error}</p>}

      <div className="col-span-2">
        <LoadingButton className="btn btn-primary" isLoading={isLoading}>
          ثبت
        </LoadingButton>
      </div>
    </form>
  );
};
export default ParameterForm;
