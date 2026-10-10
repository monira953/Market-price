
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 py-16 text-[#202a23]">
      <section className="w-full max-w-md rounded-3xl border border-[#e0e9e1] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-[#f0f5f0]">
          <SearchX size={40} className="text-green-700" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
          404 — Category Not Found
        </p>

        <h1 className="mt-3 text-2xl font-bold">
          ক্যাটাগরি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
        </p>

        <Link href="/" className="btn btn-success mt-7 text-white">
          <ArrowLeft size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}