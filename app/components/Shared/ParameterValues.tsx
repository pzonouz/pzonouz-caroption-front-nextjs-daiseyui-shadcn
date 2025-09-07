"use client";
import {
  useGetParametersByGroupQuery,
  useGetProductParameterValuesQuery,
} from "@/app/lib/features/api";
import { Category, categorySchema, Parameter } from "@/app/lib/schemas";
import { useEffect, useState } from "react";

const ParameterValues = ({ category_full }: { category_full: Category }) => {
  // const [parameterGroupId, setParameterGroupId] = useState(
  //   category_full?.parameter_groups?.[0]?.id,
  // );
  //
  // useEffect(() => {
  //   console.log(category_full);
  //   setParameterGroupId(category_full?.parameter_groups?.[0]?.id);
  // }, [category_full]);
  const parameterGroupId = category_full?.parameter_groups?.[0]?.id;
  const { data: parameters } = useGetParametersByGroupQuery(parameterGroupId, {
    skip: !parameterGroupId, // only run if id exists
  });

  const { data: parameterValues } = useGetProductParameterValuesQuery(
    undefined,
    {
      skip: !parameterGroupId, // only run if id exists
    },
  );
  return (
    <div>
      {parameters?.map((param: Parameter) => (
        <div>{param?.name}</div>
      ))}
    </div>
  );
};

export default ParameterValues;
