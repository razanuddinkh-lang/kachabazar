
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getCategories, getProducts } from "@/lib/api";

export default async function HomePage() {
  let products = await getProducts().catch(() => []);
  let categories = await getCategories().catch(() => []);

  const failed = products.length === 0;

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="market-container space-y-12 py-8 sm:py-12">
        <Hero />

        {failed && (
          <div className="alert alert-warning">
            বাজারের তথ্য পাওয়া যায়নি। API সংযোগ পরীক্ষা করুন।
          </div>
        )}

        <ProductSections products={products} />
      </main>

      <footer className="mt-16 bg-[#163e32] text-white">
        <div className="market-container flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p>Bazaar rate — price of essential products at a glance.</p>
          <p className="text-sm text-green-100">
            All prices are potential; subject to market conditions.
          </p>
        </div>
      </footer>
    </>
  );
}
