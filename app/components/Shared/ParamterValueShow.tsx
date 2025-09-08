import { Parameter, Product, productParameterValue } from "@/app/lib/schemas";
import { CircleSmall } from "lucide-react";

const ParamterValueShow = ({
  parameter,
  product,
}: {
  parameter: Parameter;
  product: Product;
}) => {
  const value = product?.parameter_values?.find(
    (item: productParameterValue) => item?.parameter === parameter?.id,
  );
  return (
    <div className="flex flex-row items-center gap-2">
      <CircleSmall fill="true" size={12} />
      <div>{parameter?.name}:</div>
      {parameter?.field_type === "TX" && value?.text_value}
      {parameter?.field_type === "SL" && value?.selectable_value}
      {parameter?.field_type === "BL" &&
        (value?.bool_value === true
          ? "بله"
          : value?.bool_value === false
            ? "خیر"
            : "-")}
    </div>
  );
};

export default ParamterValueShow;
