
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CategoryProducts from "@/components/CategoryProducts";
import {
  getCategories,
  getCategoryProducts,
} from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getCategoryProducts(slug).catch(() => []),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category || products.length === 0) {
    return (
      <>
        <Navbar categories={categories} />
        <main className="market-container flex min-h-[65vh] items-center justify-center py-10">
          <div className="max-w-lg text-center">
            <p className="text-6xl">🔎</p>
            <h1 className="mt-4 text-3xl font-bold text-[#163e32]">
              কোনো পণ্য পাওয়া যায়নি
            </h1>
            <p className="mt-3 text-gray-500">
              এই বিভাগটি পাওয়া যায়নি অথবা এতে কোনো পণ্য নেই।
            </p>
            <Link href="/"
              className="btn mt-6 border-0 bg-[#163e32] text-white">
              Go back to home page
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar categories={categories} />

      <main className="market-container min-h-[70vh] py-10">
        <h1 className="mb-2 text-3xl font-bold text-[#163e32]">
          {category.icon} {category.nameBn || category.name}
        </h1>

        <p className="mb-6 text-gray-500">
          এই বিভাগের পণ্যের বাজারদর
        </p>

        <CategoryProducts products={products} />
      </main>
    </>
  );
}
