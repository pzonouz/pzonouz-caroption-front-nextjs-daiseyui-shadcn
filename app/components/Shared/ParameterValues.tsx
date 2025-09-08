"use client";
import { useGetParametersByGroupQuery } from "@/app/lib/features/api";
import { Category, Parameter } from "@/app/lib/schemas";
import ParameterValue from "./ParameterValue";

const ParameterValues = ({
  productId,
  category_full,
}: {
  productId: string;
  category_full: Category;
}) => {
  const parameterGroupId = category_full?.parameter_groups?.[0]?.id;
  const { data: parameters } = useGetParametersByGroupQuery(parameterGroupId, {
    skip: !parameterGroupId, // only run if id exists
  });

  return (
    <div className="flex flex-col gap-3">
      {parameters?.map((param: Parameter) => (
        <ParameterValue
          key={param?.id}
          parameter={param}
          productId={productId}
        />
      ))}
    </div>
  );
};

export default ParameterValues;
