"use client";
import React from "react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  loadingText,
  children,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 ${className} ${
        isLoading ? "opacity-75 cursor-not-allowed" : ""
      }`}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};
