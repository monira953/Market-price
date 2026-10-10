
import Link from "next/link";
import type { Product } from "@/lib/api";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { dir, pct } = product.change;

  const changeStyle =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-500";

  const changeLabel =
    dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  const unitLabels: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  const unitLabel =
    unitLabels[product.unit.toLowerCase()] ?? `প্রতি ${product.unit}`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="mt-1 text-sm text-gray-500">{unitLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${changeStyle}`}
        >
          {changeLabel} {pct.toLocaleString("bn-BD") }%
        </span>
      </div>
    </Link>
  );
}