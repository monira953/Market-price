
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
        <section className="rounded-2xl bg-green-50 px-6 py-12 text-center sm:px-12">
          <p className="mb-3 font-semibold text-green-700">
            বাংলাদেশের বাজারদর এক জায়গায়
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-green-950 sm:text-5xl">
            প্রতিদিনের বাজারদর জানুন সহজেই
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
            চাল, ডাল, তেলসহ নিত্যপ্রয়োজনীয় পণ্যের দাম এবং বিভিন্ন
            বাজারের মূল্য তুলনা করুন।
          </p>

          <a href="#products" className="btn btn-success mt-6 text-white">
            পণ্যের দাম দেখুন
          </a>
        </section>

        <section id="products" className="py-12">
          <h2 className="text-2xl font-bold">পণ্যের দাম</h2>
          <p className="mt-2 text-base-content/70">
            আমাদের পণ্যের তালিকা এখানে তৈরি করব পরবর্তী ধাপে।
          </p>
        </section>
      </main>
    </>
  );
}