
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";

export default async function PriceSection() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12 py-8">
      <section>
        <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
          <span className="mr-2 text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            আজ দাম বেড়েছে এমন কোনো পণ্য নেই।
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
          <span className="mr-2 text-green-700">▼</span>
          আজ দাম কমেছে
        </h2>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            আজ দাম কমেছে এমন কোনো পণ্য নেই।
          </p>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-extrabold text-slate-900">
          সব পণ্য
        </h2>
        <p className="mb-5 mt-2 text-sm leading-6 text-slate-600">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারদরের পরিবর্তন এক জায়গায়।
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}