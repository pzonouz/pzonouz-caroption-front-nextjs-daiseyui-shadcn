import { Parameter, productParameterValue } from "@/app/lib/schemas";
import { useEffect, useState } from "react";
import { LoadingButton } from "./LoadingButton";
import {
  useCreateProductParameterValueMutation,
  useGetProductParameterValuesByProductQuery,
} from "@/app/lib/features/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorToast, SuccessToast } from "@/app/lib/Toasts";

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

  useEffect(() => {
    const value: productParameterValue = productParameterValues?.find(
      (item) => item?.parameter == parameter?.id,
    );
    setTextValue(value?.text_value || "");
    setBooleabValue(value?.bool_value || false);
    setSelectableValue(value?.selectable_value || "");
  }, [productParameterValues]);

  const [createProductParamterValue, { isLoading }] =
    useCreateProductParameterValueMutation();
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center justify-between gap-2 ">
        <p>{parameter?.name}</p>
        {parameter?.field_type == "TX" && (
          <input
            value={textValue}
            onChange={(e) => setTextValue(e.currentTarget.value)}
            type="text"
            className="input w-full"
          />
        )}
        {parameter?.field_type == "BL" && (
          <input
            type="checkbox"
            checked={booleanValue}
            onChange={() => setBooleabValue(!booleanValue)}
            className="toggle"
          />
        )}
        {parameter?.field_type == "SL" && (
          <select
            className="select w-full"
            value={selectableValue}
            onChange={(e) => setSelectableValue(e?.currentTarget?.value)}
          >
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
