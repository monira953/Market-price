"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { getProducts, type Product } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load ticker prices:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="h-10 bg-green-950" aria-label="Loading market prices" />
    );
  }

  const items = [...products, ...products];

  return (
    <section
      aria-label="Latest market prices"
      className="overflow-hidden border-b border-emerald-100 bg-emerald-50/70 text-slate-700"
    >
      <div className="flex h-11 items-center">
        <div className="z-10 flex h-full shrink-0 items-center gap-2 border-r border-emerald-100 bg-emerald-100/80 px-3 text-sm font-bold text-emerald-900 sm:px-5">
          <span aria-hidden="true">৳</span>
          <span>বাজারদর</span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center">
            {items.map((product, index) => {
              const direction = product.change?.dir;
              const isUp = direction === "up";
              const isDown = direction === "down";

              const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

              return (
                <div
                  key={`${product.id}-${index}`}
                  aria-hidden={index >= products.length}
                  className="flex shrink-0 items-center gap-2 px-4 text-sm"
                >
                  <span aria-hidden="true">{product.image}</span>

                  <span className="font-medium text-slate-700">
                    {product.nameBn}
                  </span>

                  <span className="font-semibold text-emerald-800">
                    ৳{formatPrice(product.today)}/{product.unit}
                  </span>

                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      isUp
                        ? "text-red-600"
                        : isDown
                          ? "text-emerald-700"
                          : "text-slate-500"
                    }`}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {formatPrice(product.change?.pct ?? 0)}%
                  </span>

                  <span className="ml-2 text-emerald-300" aria-hidden="true">
                    •
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
