import { Parameter, Product, ProductParameterValue } from "@/app/lib/schemas";

const ParameterValueShow = ({
  parameter,
  product,
}: {
  parameter: Parameter;
  product: Product;
}) => {
  const value = product?.productParameterValues?.find(
    (item: ProductParameterValue) => item?.parameterId === parameter?.id
  );

  return (
    <div className="flex justify-between items-center border-b-2 border-b-gray-600 py-2 text-right">
      <p className="font-medium">{parameter?.name}</p>

      {parameter?.type === "BL" && <p>{value?.boolValue ? "دارد" : "ندارد"}</p>}

      {parameter?.type === "SL" && value && <p>{value?.selectableValue}</p>}

      {parameter?.type === "TX" && value && <p>{value?.textValue}</p>}
    </div>
  );
};

export default ParameterValueShow;
