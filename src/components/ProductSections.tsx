
import type { MarketProduct } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type Props = {
  products: MarketProduct[];
};

export default function ProductSections({ products }: Props) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="market-container space-y-12 py-10">
      <section>
        <h2 className="mb-5 text-2xl font-extrabold text-[#163e32]">
          📈 দাম বেড়েছে
        </h2>

        {risers.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            দাম বেড়েছে এমন কোনো পণ্য নেই।
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-extrabold text-[#163e32]">
          📉 দাম কমেছে
        </h2>

        {fallers.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            দাম কমেছে এমন কোনো পণ্য নেই।
          </p>
        )}
      </section>

      <section id="all-products" className="scroll-mt-24">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#163e32]">
              🛒 সকল পণ্য
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              প্রতিটি পণ্যের আজকের বাজারদর
            </p>
          </div>

          <span className="rounded-full bg-[#d9f36a] px-4 py-2 font-bold text-[#163e32]">
            মোট পণ্য: {products.length.toLocaleString("bn-BD")}টি
          </span>
        </div>

        {products.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}
