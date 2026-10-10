
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowDownAZ, ArrowUpAZ, PackageOpen } from "lucide-react";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProductList from "@/components/products/CategoryProductList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let categories;
  let products;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(slug),
    ]);
  } catch {
    throw new Error("Unable to load category.");
  }

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#202a23]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-700"
        >
          <ArrowLeft size={17} />
          হোম পেজে ফিরে যান
        </Link>

        <section className="mb-8 rounded-3xl border border-[#e0e9e1] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
              {category.icon}
            </div>

            <div>
              <p className="text-sm text-gray-500">বাজারদর ক্যাটাগরি</p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                {category.nameBn}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                এই ক্যাটাগরির পণ্যের আজকের বাজারদর দেখুন।
              </p>
            </div>
          </div>
        </section>

        {products.length > 0 ? (
          <CategoryProductList products={products} />
        ) : (
          <section className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <PackageOpen className="mx-auto mb-4 text-gray-400" size={42} />
            <h2 className="text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>
            <Link href="/" className="btn btn-success mt-6 text-white">
              হোম পেজে ফিরে যান
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}