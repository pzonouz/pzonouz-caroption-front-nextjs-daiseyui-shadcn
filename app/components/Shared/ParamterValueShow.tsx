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
    <div className="flex flex-row gap-1 items-center text-gray-800">
      <div>
        {parameter?.field_type == "BL" && value?.bool_value && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            {parameter?.name}
          </div>
        )}
        {parameter?.field_type == "SL" && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            <p>{parameter?.name}</p>
            <p>{value?.selectable_value}</p>
          </div>
        )}
        {parameter?.field_type == "TX" && (
          <div className="flex flex-row gap-1">
            <p>{parameter?.name}</p>
            <p>{value?.text_value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParamterValueShow;
