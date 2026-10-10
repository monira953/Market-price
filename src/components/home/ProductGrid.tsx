
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";

export default async function ProductGrid() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <p className="py-10 text-center text-base-content/60">
        কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}