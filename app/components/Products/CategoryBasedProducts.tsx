import { Article, Category, Product } from "@/app/lib/schemas";
import { ProductCarousel } from "./ProductCarousel";

const CategoryBasedProducts = async () => {
  const categoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
    {
      next: { revalidate: 60 },
    }
  );
  const categories = await categoriesRes.json();
  const filteredCategories = categories.filter((c: Category) => {
    return c?.parentId === null && c?.children?.length > 0;
  });
  let products: Product[] = [];
  let articles: Article[] = [];
  return filteredCategories.map(async (c: Category) => {
    try {
      const productsRes = await fetch(
        `${process.env.BACKEND_URL}/products_in_category/${c?.id}`
      );
      products = await productsRes.json();
    } catch {}
    try {
      const articlesRes = await fetch(
        `${process.env.BACKEND_URL}/articles_in_category/${c.id}`,
        { next: { revalidate: 60 } }
      );

      if (articlesRes.ok) {
        articles = (await articlesRes.json()) ?? [];
      }
    } catch {}
    console.log("articles:", articles);
    console.log("products:", products);
    products = [...products, ...articles];
    return (
      <div className="bg-teal-600 p-6 mt-6" key={c?.id}>
        <div className="font-bold text-white mb-5">{c?.name}</div>
        <ProductCarousel products={products} />
      </div>
    );
  });
};
export { CategoryBasedProducts };
