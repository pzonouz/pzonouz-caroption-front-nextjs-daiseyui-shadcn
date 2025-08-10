"use client";
import React from "react";
import { useGetPersonsQuery } from "@/app/lib/features/api";
import { Person } from "@/app/lib/schemas";
import { ComboboxOption, SearchableCombobox } from "./SearchableCombobox";
import { formatPersonDisplay } from "@/app/lib/utils";

interface PersonSelectorProps {
  selectedPersonId: string;
  onPersonSelect: (personId: string) => void;
  disabled?: boolean;
  width?: string;
  className?: string;
}

export const PersonSelector: React.FC<PersonSelectorProps> = ({
  selectedPersonId,
  onPersonSelect,
  disabled = false,
  // width = "w-full",
  className = "w-fit",
}) => {
  const { data: persons, isLoading } = useGetPersonsQuery();

  const personOptions: ComboboxOption[] = (persons || []).map(
    (person: Person) => ({
      id: person.id?.toString() || "",
      value: person.id?.toString() || "",
      label: formatPersonDisplay(person),
    }),
  );

  return (
    <SearchableCombobox
      options={personOptions}
      value={selectedPersonId}
      onValueChange={onPersonSelect}
      placeholder="انتخاب طرف حساب..."
      searchPlaceholder="جستجوی طرف حساب..."
      emptyText="طرف حساب یافت نشد"
      disabled={disabled}
      // width={width}
      isLoading={isLoading}
      className={className}
    />
  );
};
