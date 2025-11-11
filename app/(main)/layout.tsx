import { ReactNode } from "react";
import Navbar from "../components/Navigations/Navbar";
import { Footer } from "../components/Navigations/Footer";
import { TopBar } from "../components/Navigations/TopBar";
import { Toaster } from "sonner";
import RecursiveMenu from "../components/Shared/RecursiveMenu";
import { Category } from "../lib/schemas";

const layout = async ({ children }: { children: ReactNode }) => {
  const parentCategoriesRes = await fetch(
    `${process.env.BACKEND_URL}/parent_categories`,
  );
  const categories: Category[] = await parentCategoriesRes.json();
  const frames: Category[] = categories.filter(
    (c: Category) => c?.name == "قاب مانیتور",
  )[0];
  // const monitors: Category[] = categories[0];
  const monitors = categories.filter(
    (c: Category) => c?.name == "مانیتور خودرو",
  )[0];
  const restCategories = categories.filter(
    (c: Category) => c?.name != "مانیتور خودرو",
  );
  // @ts-ignore
  monitors.children = [...monitors.children, ...frames?.children];
  const modifiedCategories = [monitors, ...restCategories].filter(
    (i) => i.show,
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
