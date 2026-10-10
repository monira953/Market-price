"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";
import { getCategories, type Category } from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    let active = true;

    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="flex min-h-[88px] items-center justify-between gap-4 py-4">
          <Link
            href="/"
            aria-label="বাজার দর home"
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12">
              <ShoppingCart
                size={25}
                strokeWidth={2.2}
                className="text-black"
                aria-hidden="true"
              />
            </span>

            <span className="flex flex-col">
              <span className="text-[23px] font-extrabold leading-tight tracking-tight text-emerald-800 sm:text-[27px]">
                বাজার দর
              </span>
              <span className="mt-1 text-[11px] font-medium text-slate-500 sm:text-xs">
                {banglaDate}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/signin"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 sm:px-4"
            >
              <LogIn size={17} strokeWidth={1.8} />
              <span>সাইন ইন</span>
            </Link>

            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:px-4"
            >
              <UserPlus size={16} strokeWidth={1.8} />
              <span>সাইন আপ</span>
            </Link>
          </div>
        </div>

        {/* Category navigation */}
        <nav
          aria-label="পণ্যের বিভাগ"
          className="-mx-1 flex items-center gap-1.5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors ${
              isActive("/")
                ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
            }`}
          >
            সব পণ্য
          </Link>

          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = isActive(href);

            return (
              <Link
                key={category.id}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
                }`}
              >
                <span className="text-base" aria-hidden="true">
                  {category.icon}
                </span>
                <span>{category.nameBn}</span>
                {active && (
                  <ChevronRight
                    size={14}
                    className="text-emerald-700"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
