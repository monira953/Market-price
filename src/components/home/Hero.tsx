
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[28px] bg-[#eef6f0] px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-2 md:gap-6 lg:px-14 lg:py-12">
        {/* Left content */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center rounded-full bg-[#d9eadf] px-4 py-2 text-sm font-semibold text-emerald-800">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-6 max-w-xl text-3xl leading-snug font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.25]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            সব পণ্য দেখুন
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Right banner image */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md md:aspect-square md:max-w-none">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের তাজা পণ্য"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}