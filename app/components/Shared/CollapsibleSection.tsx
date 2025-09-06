"use client";
import React from "react";
import { Plus, Minus } from "lucide-react";

interface CollapsibleSectionProps {
  isOpen: boolean;
  onToggle: (e?: React.SyntheticEvent) => void;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  isOpen,
  onToggle,
  children,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 border-none outline-none cursor-pointer`}
        aria-expanded={isOpen}
      >
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>

      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
