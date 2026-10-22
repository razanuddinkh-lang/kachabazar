
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCategories, getProduct } from "@/lib/api";
import { taka } from "@/lib/format";
import Navbar from "@/components/Navbar";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`,
    );
  }

  const [product, categories] = await Promise.all([
    getProduct(slug),
    getCategories().catch(() => []),
  ]);

  if (!product) notFound();

  return (
    <>
      <Navbar categories={categories} />

      <main className="market-container py-10">
        <div className="card border border-base-300 bg-white shadow-sm">
          <div className="card-body p-6 sm:p-10">
            <div className="text-7xl">{product.emoji}</div>

            <h1 className="text-3xl font-bold text-[#163e32]">
              {product.nameBn}
            </h1>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">
                {product.category}
              </span>
              <span className="badge badge-outline">
                প্রতি {product.unit}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-green-50 p-5">
                <p>সর্বনিম্ন দাম</p>
                <p className="mt-2 text-2xl font-bold">
                  {taka(product.minPrice)}
                </p>
              </div>

              <div className="rounded-xl bg-lime-50 p-5">
                <p>গড় দাম</p>
                <p className="mt-2 text-2xl font-bold">
                  {taka(product.averagePrice)}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-5">
                <p>সর্বোচ্চ দাম</p>
                <p className="mt-2 text-2xl font-bold">
                  {taka(product.maxPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
