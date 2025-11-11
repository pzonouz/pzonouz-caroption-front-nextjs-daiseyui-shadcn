"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, Menu, X } from "lucide-react";
import { Category } from "@/app/lib/schemas";

export default function CategoryMenuWrapper({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // 🔹 Function to close menu (passed to children)
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="flex text-white bg-red-600  justify-center w-28 cursor-pointer items-center gap-2 px-3 py-2 rounded-md transition"
      >
        <Menu size={20} />
        <span className="text-sm font-medium w-fit">دسته‌بندی</span>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"></div>
      )}

      {/* Sliding panel (from right) */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">دسته‌بندی</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 overflow-y-auto h-full">
          <RecursiveMenu categories={categories} closeMenu={closeMenu} />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function RecursiveMenu({
  categories,
  closeMenu,
}: {
  categories: Category[];
  closeMenu: () => void;
}) {
  return (
    <ul className="space-y-1">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          closeMenu={closeMenu}
        />
      ))}
    </ul>
  );
}

function CategoryItem({
  category,
  closeMenu,
}: {
  category: Category;
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeMenu(); // ✅ Close the menu
  };

  return (
    <div className="text-gray-700">
      <div className="cursor-default flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition">
        <Link
          href={`/categories/${category.slug}`}
          onClick={handleClick}
          className="text-sm font-medium text-gray-800 cursor-pointer"
        >
          {category.name}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            className="ml-2 text-gray-500 hover:text-gray-800 transition cursor-pointer"
          >
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`pr-4 border-r border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <RecursiveMenu
            categories={category.children!}
            closeMenu={closeMenu}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Optional Tailwind animation */
<style jsx global>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`}</style>;
