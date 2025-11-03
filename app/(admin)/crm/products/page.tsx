"use client";
import { useEffect, useState } from "react";
import { columns } from "@/app/components/Products/Columns";
import { CreateProduct } from "@/app/components/Products/CreateProduct";
import { Combobox } from "@/app/components/Shared/ComboBox";
import { DataTable } from "@/app/components/Shared/DataTable";
import {
  useGetParentCategoriesQuery,
  useGetProductsQuery,
} from "@/app/lib/features/api";
import { Category, Product } from "@/app/lib/schemas";
import { Checkbox } from "@/components/ui/checkbox"; // Adjust path if needed

const Page = () => {
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categories } = useGetParentCategoriesQuery();

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [showGeneratedOnly, setShowGeneratedOnly] = useState(false);
  const [showNotGeneratedOnly, setShowNotGeneratedOnly] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Extract child categories from parent categories
  useEffect(() => {
    if (categories) {
      const children: Category[] = [];
      categories.forEach((c: Category) => {
        if (c.children?.length) {
          children.push(...c.children);
        }
      });
      setFilteredCategories(children);
    }
  }, [categories]);

  // Filter products based on selected category and generated flag
  useEffect(() => {
    if (products) {
      let filtered = category
        ? products.filter((p) => p.categoryId === category)
        : products;

      if (showGeneratedOnly) {
        filtered = filtered.filter((p) => p.generated);
      }
      if (showNotGeneratedOnly) {
        filtered = filtered.filter((p) => !p.generated);
      }

      setFilteredProducts(filtered);
    }
  }, [products, category, showGeneratedOnly, showNotGeneratedOnly]);

  return (
    <div className="pt-20 flex flex-col items-center justify-center w-full">
      <CreateProduct />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Combobox
          className="text-right z-1"
          title="دسته بندی"
          array={filteredCategories}
          value={category}
          setValue={setCategory}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            id="generated"
            checked={showGeneratedOnly}
            onCheckedChange={(checked) => setShowGeneratedOnly(!!checked)}
          />
          <label htmlFor="generated" className="text-sm">
            فقط محصولات تولید شده
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="generated"
            checked={showNotGeneratedOnly}
            onCheckedChange={(checked) => setShowNotGeneratedOnly(!!checked)}
          />
          <label htmlFor="generated" className="text-sm">
            فقط محصولات اصلی
          </label>
        </div>
      </div>
      {productsLoading ? (
        <div className="loading loading-spinner w-24 h-24 text-center"></div>
      ) : (
        <DataTable
          filterColumns={[{ title: "نام", column: "name" }]}
          columns={columns}
          data={filteredProducts}
        />
      )}
    </div>
  );
};

export default Page;
