import { Parameter, ProductParameterValue } from "@/app/lib/schemas";
import { useEffect, useState } from "react";
import { LoadingButton } from "./LoadingButton";
import {
  useCreateProductParameterValueMutation,
  useGetProductParameterValuesByProductQuery,
} from "@/app/lib/features/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";
import { useAppDispatch } from "@/app/lib/hooks";
import { LoadingHide, LoadingShow } from "@/app/lib/features/LoadingSlice";

const ParameterValue = ({
  parameter,
  productId,
}: {
  parameter: Parameter;
  productId: string;
}) => {
  const { data: productParameterValues, isFetching } =
    useGetProductParameterValuesByProductQuery(productId, { skip: !productId });
  const [selectableValue, setSelectableValue] = useState<string>();
  const [textValue, setTextValue] = useState<string>("");
  const [booleanValue, setBooleabValue] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    isFetching ? dispatch(LoadingShow()) : dispatch(LoadingHide());
  }, [isFetching, dispatch]);

  useEffect(() => {
    const value: ProductParameterValue = productParameterValues?.find(
      (item) => item?.parameter == parameter?.id,
    );
    setTextValue(value?.text_value);
    setBooleabValue(value?.bool_value || true);
    setSelectableValue(value?.selectable_value || "");
  }, [productParameterValues, parameter?.id]);

  const [createProductParamterValue, { isLoading }] =
    useCreateProductParameterValueMutation();
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center  justify-between gap-2 w-full">
        <p className="text-wrap w-full">{parameter?.name}</p>
        {parameter?.field_type == "TX" && (
          <input
            value={textValue}
            onChange={(e) => setTextValue(e.currentTarget.value)}
            type="text"
            className="input w-full wrap-break-word"
          />
        )}
        {parameter?.field_type == "BL" && (
          <input
            type="checkbox"
            checked={booleanValue}
            onChange={() => setBooleabValue((prev) => !prev)}
            className="toggle"
          />
        )}
        {parameter?.field_type == "SL" && (
          <select
            className="select w-full"
            value={selectableValue}
            onChange={(e) => setSelectableValue(e?.currentTarget?.value)}
          >
            <option value={""}>انتخاب کنید</option>
            {parameter?.selectable_values?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        )}
      </div>
      <LoadingButton
        isLoading={isLoading}
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          createProductParamterValue({
            product: productId,
            parameter: parameter?.id,
            text_value: textValue,
            bool_value: booleanValue,
            selectable_value: selectableValue,
          })
            .unwrap()
            .then(() => SuccessToast())
            .catch((err: FetchBaseQueryError) => ErrorToast("ایراد"));
        }}
      >
        ثبت
      </LoadingButton>
    </div>
  );
};

export default ParameterValue;
