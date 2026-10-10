
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        <Hero />

        <section id="সব-পণ্য" className="scroll-mt-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900">
            পণ্যের দাম
          </h2>
          <p className="mt-2 text-base-content/70">
            আমাদের পণ্যের তালিকা এখানে তৈরি করব পরবর্তী ধাপে।
          </p>
        </section>
      </main>
    </>
  );
}