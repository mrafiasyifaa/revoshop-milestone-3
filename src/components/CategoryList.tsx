"use client";
import React from "react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface Props {
  selectedCategory: string;
  onTabSelect: (category: string) => void;
}

const CategoryList = ({ selectedCategory, onTabSelect }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await res.json();
        const filtered = data.filter((cat) => cat.slug !== "here-category");
        setCategories(filtered);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      abortController.abort();
    };
  }, []);

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        Error loading categories: {error}
      </div>
    );
  }

  const allCategories = [
    { id: 0, name: "All", slug: "all", image: "" },
    ...categories,
  ];

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex item-center gap-3 text-sm overflow-x-auto pb=2 scrollbar-hide font-poppins">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-revoshop-accent/30 px-4 py-1.5 md:px-6 rounded-md bg-gray-200 animate-pulse w-20 h-9"
              />
            ))}
          </>
        ) : (
          allCategories.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabSelect(item.name)}
              className={`border border-revoshop-accent/10 px-4 py-1.5 md:px-6 rounded-md hover:bg-revoshop-accent-hover hover:border-revoshop-navy hover:text-white hoverEffect ${selectedCategory === item.name ? "bg-revoshop-accent text-white" : "bg-revoshop-accent/10"}`}
            >
              {item.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
