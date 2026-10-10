
import Link from "next/link";
import { SearchX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f0f5f0] px-4">
      <div className="max-w-md text-center">
        <SearchX
          className="mx-auto mb-5 text-green-700"
          size={56}
        />

        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't find this product. It may have been removed
          or the link may be incorrect.
        </p>

        <Link
          href="/"
          className="btn mt-6 border-0 bg-green-700 text-white hover:bg-green-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}