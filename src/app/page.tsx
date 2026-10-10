
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Hero from "@/components/home/Hero";
import PriceSections from "@/components/home/PriceSections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        <Hero />
        <PriceSections />
      </main>
    </>
  );
}