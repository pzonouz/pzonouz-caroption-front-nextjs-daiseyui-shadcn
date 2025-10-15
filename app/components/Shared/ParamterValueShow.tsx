import { Parameter, Product, ProductParameterValue } from "@/app/lib/schemas";
import { CircleSmall } from "lucide-react";

const ParamterValueShow = ({
  parameter,
  product,
}: {
  parameter: Parameter;
  product: Product;
}) => {
  const value = product?.productParameterValues?.find(
    (item: ProductParameterValue) => item?.parameterId === parameter?.id,
  );
  return (
    <div className="flex flex-row gap-1 items-center text-gray-800">
      <div>
        {parameter?.type == "BL" && value?.boolValue && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            <p>دارای</p>
            {parameter?.name}
          </div>
        )}
        {parameter?.type == "SL" && value && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            <p>{parameter?.name}</p>
            <p>:</p>
            <p>{value?.selectableValue}</p>
          </div>
        )}
        {parameter?.type == "TX" && value && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            <p>{parameter?.name}</p>
            <p>:</p>
            <p>{value?.textValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParamterValueShow;
