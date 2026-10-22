
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { MarketProduct } from "@/types/product";

type SortMode = "default" | "low" | "high";

export default function CategoryProducts({
  products,
}: {
  products: MarketProduct[];
}) {
  const [sort, setSort] = useState<SortMode>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট পণ্য: {products.length}
        </p>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          aria-label="দাম অনুযায়ী সাজান"
        >
          <option value="default">Default sort</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
