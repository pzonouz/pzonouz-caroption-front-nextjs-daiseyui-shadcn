import { Parameter, Product, ProductParameterValue } from "@/app/lib/schemas";
import { CircleSmall } from "lucide-react";

const ParamterValueShow = ({
  parameter,
  product,
}: {
  parameter: Parameter;
  product: Product;
}) => {
  const value = product?.parameterValues?.find(
    (item: ProductParameterValue) => item?.parameterId === parameter?.id,
  );
  return (
    <div className="flex flex-row gap-1 items-center text-gray-800">
      <div>
        {parameter?.type == "BL" && value?.boolValue && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            {parameter?.name}
          </div>
        )}
        {parameter?.type == "SL" && (
          <div className="flex flex-row gap-1 items-center">
            <CircleSmall fill="true" size={12} />
            <p>{parameter?.name}</p>
            <p>{value?.selectableValue}</p>
          </div>
        )}
        {parameter?.type == "TX" && (
          <div className="flex flex-row gap-1">
            <p>{parameter?.name}</p>
            <p>{value?.textValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParamterValueShow;
