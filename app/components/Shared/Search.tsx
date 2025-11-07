"use client";

import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { replaceWithPersianDigits } from "@/app/lib/utils";
import Link from "next/link";
import { Product } from "@/app/lib/schemas";

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (timer.current) {
      window.clearTimeout(timer.current);
    }

    // ⏳ Debounce before starting fetch
    timer.current = window.setTimeout(async () => {
      setLoading(true); // start loading here

      try {
        const correctedQuery = replaceWithPersianDigits(query);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?q=${encodeURIComponent(
            correctedQuery,
          )}`,
        );

        if (!res.ok) {
          console.error("Search failed:", res.status);
          setResults([]);
        } else {
          const data = await res.json();
          setResults(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false); // stop loading after fetch
      }
    }, 300);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="btn btn-ghost btn-circle"
          aria-label="Open search"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-full py-3 px-6 bg-white">
        <div>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => {
                setQuery(e?.currentTarget?.value);
              }}
              type="search"
              className="grow"
              placeholder="برای جستجو در نام کالا چیزی بنویسید"
            />
          </label>
          {/* 🟡 Show skeletons while loading */}
          {loading && (
            <div className="flex flex-col items-start gap-4 p-6">
              {[1, 2, 3, 4]?.map((item) => (
                <div key={item} className="skeleton h-12 w-full"></div>
              ))}
            </div>
          )}

          {/* 🟢 Show results when loaded */}
          {!loading &&
            (query?.length > 0 && results?.length > 0 ? (
              <div className="flex flex-col w-full p-6 gap-4 h-56 overflow-y-auto">
                {results.map((r) => (
                  <Link
                    href={`/products/${r?.slug}`}
                    key={r.id}
                    className="flex items-center gap-4 h-12 hover:bg-cyan-300 rounded-lg px-2 py-6 cursor-pointer"
                    onSelect={() => {
                      setOpen(false);
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <img
                      src={
                        r.imageUrl
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}/${r.imageUrl}`
                          : "/placeholder-40.png"
                      }
                      alt={r.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="truncate font-medium">{r.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid place-items-center w-full h-56">
                نتیجه ای یافت نشد
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
