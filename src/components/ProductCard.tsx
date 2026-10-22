
import Link from "next/link";
import type { MarketProduct } from "@/types/product";
import { taka, percent } from "@/lib/format";

export default function ProductCard({
  product,
}: {
  product: MarketProduct;
}) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "text-green-700 bg-green-100"
    : isDown
      ? "text-red-700 bg-red-100"
      : "text-gray-600 bg-gray-100";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Product details link */}
      <Link
        href={`/product/${encodeURIComponent(product.slug)}`}
        className="block"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f4f7ef] text-4xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-bold ${changeColor}`}
          >
            {isUp ? "▲ " : isDown ? "▼ " : "— "}
            {percent(product.change.pct)}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#183b30]">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {product.categoryNameBn} · প্রতি {product.unit}
        </p>

        <div className="mt-4 rounded-xl bg-[#f4f7ef] p-3">
          <p className="text-xs font-medium text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-2xl font-extrabold text-[#163e32]">
            {taka(product.today)}
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              isUp
                ? "text-green-700"
                : isDown
                  ? "text-red-700"
                  : "text-gray-600"
            }`}
          >
            {isUp
              ? "দাম বেড়েছে"
              : isDown
                ? "দাম কমেছে"
                : "দাম অপরিবর্তিত"}{" "}
            {percent(product.change.pct)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
          <div>
            <p className="text-xs text-gray-500">গতকাল</p>
            <p className="mt-1 text-sm font-semibold">
              {taka(product.yesterday)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">গত সপ্তাহ</p>
            <p className="mt-1 text-sm font-semibold">
              {taka(product.lastWeek)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">গত মাস</p>
            <p className="mt-1 text-sm font-semibold">
              {taka(product.lastMonth)}
            </p>
          </div>
        </div>
      </Link>

      {/* Separate markets page link */}
      <Link
        href="/markets"
        className="btn btn-primary mt-4 w-full"
      >
        বাজারভিত্তিক দাম দেখুন →
      </Link>
    </div>
  );
}
