"use client";
// import { useGetParametersByGroupQuery } from "@/app/lib/features/api";
// import { Category, Parameter } from "@/app/lib/schemas";
// import ParameterValue from "./ParameterValue";
//
// const ParameterValues = ({
//   productId,
//   category_full,
// }: {
//   productId: string;
//   category_full: Category;
// }) => {
//   const parameterGroupId = category_full?.parameter_groups?.[0]?.id;
//   const { data: parameters } = useGetParametersByGroupQuery(parameterGroupId, {
//     skip: !parameterGroupId, // only run if id exists
//   });
//
//   return (
//     <div className="flex flex-col gap-3">
//       {parameters?.map((param: Parameter) => (
//         <ParameterValue
//           key={param?.id}
//           parameter={param}
//           productId={productId}
//         />
//       ))}
//     </div>
//   );
// };
//
// export default ParameterValues;
// ParameterValues.tsx
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Parameter, Product, productParameterValue } from "@/app/lib/schemas";

interface Props {
  parameters: Parameter[];
  register: UseFormRegister<Product>;
  watch: UseFormWatch<Product>;
  setValue: UseFormSetValue<Product>;
}

const ParameterValues = ({ parameters, register, watch, setValue }: Props) => {
  const parameterValues = watch("parameter_values") ?? [];

  const updateValue = (parameterId: string, field: string, value: any) => {
    const updated = [...parameterValues];
    const idx = updated.findIndex((v) => v.parameter === parameterId);
    if (idx >= 0) {
      updated[idx] = { ...updated[idx], [field]: value };
    } else {
      updated.push({ parameter: parameterId, [field]: value });
    }
    setValue("parameter_values", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className=" mt-6 border rounded-xl p-4">
      <h3 className="text-lg font-bold mb-4">ویژگی‌ها</h3>
      {parameters?.map((p) => {
        const value = parameterValues.find(
          (v: productParameterValue) => v.parameter === p.id,
        );
        return (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 mb-2"
          >
            <label className="w-40">{p.name}</label>

            {p.field_type === "TX" && (
              <input
                type="text"
                value={value?.text_value ?? ""}
                onChange={(e) =>
                  updateValue(p.id, "text_value", e.target.value)
                }
                className="input input-bordered"
              />
            )}

            {p.field_type === "BL" && (
              <input
                className="toggle"
                type="checkbox"
                checked={Boolean(value?.bool_value)}
                onChange={(e) =>
                  updateValue(p.id, "bool_value", e.target.checked)
                }
              />
            )}

            {p.field_type === "SL" && (
              <select
                value={value?.selectable_value ?? ""}
                onChange={(e) =>
                  updateValue(p.id, "selectable_value", e.target.value)
                }
                className="select select-bordered"
              >
                <option value="">انتخاب کنید</option>
                {p.selectable_values?.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParameterValues;
