
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  ShoppingBasket,
} from "lucide-react";
import { getProducts } from "@/lib/api";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatMoney(value: number) {
  return `${formatPrice(value)} টাকা`;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch {
    throw new Error("Unable to load product details.");
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets: Market[] = product.markets ?? [];

  const allPrices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minPrice =
    allPrices.length > 0
      ? Math.min(...allPrices)
      : product.today;

  const maxPrice =
    allPrices.length > 0
      ? Math.max(...allPrices)
      : product.today;

  const averagePrice =
    allPrices.length > 0
      ? allPrices.reduce((sum, price) => sum + price, 0) /
        allPrices.length
      : product.today;

  const changeDirection = product.change?.dir;
  const changePercent = Number(product.change?.pct ?? 0);

  const isUp = changeDirection === "up";
  const isDown = changeDirection === "down";
  const isFlat = !isUp && !isDown;

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#202a23]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-700"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Product summary */}
        <section className="rounded-3xl border border-[#e0e9e1] bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="badge badge-success badge-outline">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>

                <span className="badge badge-ghost">
                  {product.unit}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {product.image} {product.nameBn}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                Current market prices for {product.nameBn}.
                Compare prices across markets and divisions to
                understand today's price range.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-500">
                  Unit: {product.unit}
                </span>

                <span
                  className={`badge ${
                    isUp
                      ? "badge-error"
                      : isDown
                        ? "badge-success"
                        : "badge-ghost"
                  }`}
                >
                  {isUp ? (
                    <ArrowUpRight size={14} />
                  ) : isDown ? (
                    <ArrowDownRight size={14} />
                  ) : (
                    <Minus size={14} />
                  )}

                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {formatPrice(changePercent)}%
                </span>
              </div>
            </div>

            <div className="flex min-h-36 min-w-36 items-center justify-center rounded-3xl bg-[#f0f5f0] p-6 text-7xl">
              {product.image || <ShoppingBasket size={64} />}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">Today's price</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {formatMoney(product.today)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {product.unit}
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            Price Summary
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="card border border-[#e0e9e1] bg-white shadow-sm">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Minimum Price
                  </p>
                  <TrendingDown
                    className="text-green-600"
                    size={20}
                  />
                </div>

                <p className="text-2xl font-bold">
                  {formatMoney(minPrice)}
                </p>

                <p className="text-xs text-gray-500">
                  Lowest listed market price
                </p>
              </div>
            </div>

            <div className="card border border-[#e0e9e1] bg-white shadow-sm">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Average Price
                  </p>
                  <TrendingUp
                    className="text-blue-600"
                    size={20}
                  />
                </div>

                <p className="text-2xl font-bold">
                  {formatMoney(averagePrice)}
                </p>

                <p className="text-xs text-gray-500">
                  Average of listed market minimum and maximum prices
                </p>
              </div>
            </div>

            <div className="card border border-[#e0e9e1] bg-white shadow-sm">
              <div className="card-body gap-3 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Maximum Price
                  </p>
                  <TrendingUp
                    className="text-red-500"
                    size={20}
                  />
                </div>

                <p className="text-2xl font-bold">
                  {formatMoney(maxPrice)}
                </p>

                <p className="text-xs text-gray-500">
                  Highest listed market price
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market-by-market prices */}
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                Today's Market Prices
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Compare prices by market and division.
              </p>
            </div>

            <span className="badge badge-ghost">
              {formatPrice(markets.length)} markets
            </span>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#e0e9e1] bg-white">
              <table className="table">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Division</th>
                    <th>Minimum Price</th>
                    <th>Maximum Price</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr key={`${market.market}-${index}`}>
                      <td>
                        <div className="flex items-center gap-2 font-semibold">
                          <MapPin
                            size={16}
                            className="shrink-0 text-green-700"
                          />
                          {market.market}
                        </div>
                      </td>

                      <td>{market.division}</td>

                      <td className="font-medium text-green-700">
                        {formatMoney(market.min)}
                      </td>

                      <td className="font-medium">
                        {formatMoney(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <MapPin
                className="mx-auto mb-3 text-gray-400"
                size={32}
              />

              <h3 className="font-semibold">
                No market prices available
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Market-level data is not available for this product yet.
              </p>
            </div>
          )}
        </section>

        <div className="mt-8 rounded-xl bg-white p-4 text-sm text-gray-500">
          Prices are indicative and may change depending on local
          market conditions.
        </div>
      </div>
    </main>
  );
}