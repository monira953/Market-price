
"use client";

import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, ArrowDownUp } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/api";

type SortOption = "default" | "asc" | "desc";

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">সকল পণ্য</h2>
          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length}টি পণ্য
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <ArrowDownUp size={17} className="text-green-700" />
          <span className="font-medium">সাজান:</span>

          <select
            className="select select-bordered select-sm max-w-56 bg-white"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}