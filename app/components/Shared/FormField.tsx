"use client";
import classNames from "classnames";
import React from "react";

interface FormFieldProps {
  label?: string;
  title?: string;
  error?: string | undefined;
  className?: string;
  register: Function;
  value?: string;
  onChange?: Function;
  hidden?: boolean;
  defaultValue?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label = "",
  title = "",
  error,
  className = "",
  register,
  value = null,
  onChange = null,
  hidden = false,
  defaultValue = undefined,
}) => {
  return (
    <label className={`floating-label w-full ${className}`}>
      <span>{label}</span>
      <input
        hidden={hidden}
        {...register(title)}
        defaultValue={defaultValue}
        {...(value !== undefined && value !== null ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        dir="rtl"
        type="text"
        className={classNames("input input-md w-full", {
          "input-error": error,
        })}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
};
