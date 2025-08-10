"use client";
import { formatStringToCommaSeparatedNumber } from "@/app/lib/utils";
import React, { useState, useEffect } from "react";

interface EditableTableCellProps {
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "number";
  className?: string;
  placeholder?: string;
  debounceMs?: number;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = ({
  value,
  onValueChange,
  type = "text",
  className = "",
  placeholder = "",
  debounceMs = 500,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    const formattedValue =
      type === "number"
        ? formatStringToCommaSeparatedNumber(newValue.replace(/[^0-9]/g, ""))
        : newValue;

    setLocalValue(formattedValue);

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for debounced update
    const newTimeoutId = setTimeout(() => {
      const cleanValue =
        type === "number" ? formattedValue.replaceAll(",", "") : formattedValue;
      onValueChange(cleanValue);
    }, debounceMs);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <input
      type="text"
      value={
        type === "number"
          ? formatStringToCommaSeparatedNumber(localValue)
          : localValue
      }
      onChange={(e) => handleChange(e.target.value)}
      className={`w-full p-2 border-0 bg-transparent text-center focus:bg-white focus:border focus:border-blue-300 focus:outline-none rounded transition-all ${className}`}
      placeholder={placeholder}
    />
  );
};
