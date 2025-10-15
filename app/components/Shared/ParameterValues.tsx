"use client";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Parameter, Product, ProductParameterValue } from "@/app/lib/schemas";

interface Props {
  parameters: Parameter[];
  register: UseFormRegister<Product>;
  watch: UseFormWatch<Product>;
  setValue: UseFormSetValue<Product>;
}

const ParameterValues = ({ parameters, watch, setValue }: Props) => {
  const productParameterValues = watch("productParameterValues") ?? [];

  const updateValue = (parameterId: string, field: string, value: any) => {
    const updated = [...productParameterValues];
    const idx = updated.findIndex((v) => v.parameterId === parameterId);

    // Define default structure
    const defaultValue = {
      parameterId,
      textValue: "",
      boolValue: false,
      selectableValue: "",
    };

    if (idx >= 0) {
      updated[idx] = {
        ...defaultValue,
        ...updated[idx],
        [field]: value,
      };
    } else {
      updated.push({
        ...defaultValue,
        [field]: value,
      });
    }

    setValue("productParameterValues", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  return (
    <div className=" mt-6 border rounded-xl p-4">
      <h3 className="text-lg font-bold mb-4">ویژگی‌ها</h3>
      {parameters?.map((p) => {
        const value = productParameterValues.find(
          (v: ProductParameterValue) => v.parameterId === p.id,
        );
        return (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 mb-2"
          >
            <label className="w-40">{p.name}</label>

            {p.type === "TX" && (
              <input
                type="text"
                value={value?.textValue ?? ""}
                onChange={(e) => updateValue(p.id, "textValue", e.target.value)}
                className="input input-bordered"
              />
            )}

            {p.type === "BL" && (
              <input
                className="toggle"
                type="checkbox"
                checked={Boolean(value?.boolValue)}
                onChange={(e) =>
                  updateValue(p.id, "boolValue", e.target.checked)
                }
              />
            )}

            {p.type === "SL" && (
              <select
                value={value?.selectableValue ?? ""}
                onChange={(e) =>
                  updateValue(p.id, "selectableValue", e.target.value)
                }
                className="select select-bordered"
              >
                <option value="">انتخاب کنید</option>
                {p.selectables?.map((v) => (
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
