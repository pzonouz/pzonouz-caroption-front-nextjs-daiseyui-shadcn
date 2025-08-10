"use client";
import React from "react";
import { useGetProductsQuery } from "@/app/lib/features/api";
import { Product } from "@/app/lib/schemas";
import { ComboboxOption, SearchableCombobox } from "./SearchableCombobox";

interface ProductSelectorProps {
  selectedProductId: string;
  onProductSelect: (productId: string, price: string) => void;
  disabled?: boolean;
  width?: string;
  className?: string;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  selectedProductId,
  onProductSelect,
  disabled = false,
  width = "w-[300px]",
  className = "",
}) => {
  const { data: products, isLoading } = useGetProductsQuery();

  const productOptions: ComboboxOption[] = (products || []).map(
    (product: Product) => ({
      id: product.id?.toString() || "",
      value: product.id?.toString() || "",
      label: product.name || "",
    }),
  );

  const handleProductChange = (productId: string) => {
    const selectedProduct = products?.find(
      (p: Product) => p.id?.toString() === productId,
    );
    const price = selectedProduct?.price?.toString() || "";
    onProductSelect(productId, price);
  };

  return (
    <SearchableCombobox
      options={productOptions}
      value={selectedProductId}
      onValueChange={handleProductChange}
      placeholder="انتخاب کالا..."
      searchPlaceholder="جستجوی کالا..."
      emptyText="کالا یافت نشد"
      disabled={disabled}
      width={width}
      isLoading={isLoading}
      className={className}
    />
  );
};
