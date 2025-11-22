import { Article, Category, Product } from "@/app/lib/schemas";
import { ProductCarousel } from "./ProductCarousel";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CategoryBasedProducts = async () => {
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
    { next: { revalidate: 60 } }
  );

  const categories = await categoriesRes.json();
  const filteredCategories = categories.filter((c: Category) => {
    return c?.show && c?.parentId === null && c?.children?.length > 0;
  });

  return Promise.all(
    filteredCategories.map(async (c: Category) => {
      let products: Product[] = [];
      let articles: Article[] = [];

      try {
        const productsRes = await fetch(
          `${process.env.BACKEND_URL}/products_in_category/${c.id}`
        );
        products = await productsRes.json();
      } catch {}

      try {
        const articlesRes = await fetch(
          `${process.env.BACKEND_URL}/articles_in_category/${c.id}`,
          { next: { revalidate: 60 } }
        );
        if (articlesRes.ok) articles = await articlesRes.json();
      } catch {}

      // 🔥 MIX THEM TOGETHER
      const mixedItems = [
        ...products.map((p) => ({ ...p, type: "product" })),
        ...articles.map((a) => ({ ...a, type: "article" })),
      ];

      return (
        <div className="bg-gray-600  mt-6" key={c?.id}>
          <div className="flex justify-between items-center">
            <div className="font-bold text-white p-5"> {c.name}</div>
            <Link href={`/categories/${c?.slug}`} className="text-white flex ">
              <div>مشاهده همه</div>
              <ChevronLeft />
            </Link>
          </div>
          <ProductCarousel products={mixedItems} className="p-2" />
        </div>
      );
    })
  );
};

export { CategoryBasedProducts };
