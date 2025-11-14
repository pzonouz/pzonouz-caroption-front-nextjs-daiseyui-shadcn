import { ReactNode } from "react";
import Navbar from "../components/Navigation/Navbar";
import { Footer } from "../components/Navigation/Footer";
import { TopBar } from "../components/Navigation/TopBar";
import { Toaster } from "sonner";
import RecursiveMenu from "../components/Shared/RecursiveMenu";
import { Category, Entity } from "../lib/schemas";

const layout = async ({ children }: { children: ReactNode }) => {
  const parentCategoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`
  );
  const categories: Category[] = await parentCategoriesRes.json();
  const entitiesRes = await fetch(`${process.env.BACKEND_URL}/parent_entities`);
  const frames: Entity[] = await entitiesRes.json();
  const monitors = categories.filter(
    (c: Category) => c?.name == "مانیتور خودرو"
  )[0];
  const restCategories = categories.filter(
    (c: Category) => c?.name != "مانیتور خودرو"
  );
  // @ts-ignore
  monitors.children = [...frames];
  const modifiedCategories = [monitors, ...restCategories].filter(
    (i) => i.show
  );
  return (
    <div>
      <TopBar />
      <Navbar />
      <div className="menu bg-base-100 w-full rounded-box p-2">
        <RecursiveMenu categories={modifiedCategories} />
      </div>
      <Toaster />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
