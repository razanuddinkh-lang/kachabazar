
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

type ApiResponse = {
  status?: boolean;
  message?: string;
  data?: Product[] | { products?: Product[] };
};

export default async function MarketsPage() {
  // 1. Check the user's Better Auth session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Redirect visitors who are not signed in
  if (!session) {
    redirect("/sign-in?callbackURL=%2Fmarkets");
  }

  // 3. Fetch product data from the API
  let products: Product[] = [];

  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products?category=chal",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result: ApiResponse | Product[] = await response.json();

    if (Array.isArray(result)) {
      products = result;
    } else if (Array.isArray(result.data)) {
      products = result.data;
    } else if (
      result.data &&
      !Array.isArray(result.data) &&
      Array.isArray(result.data.products)
    ) {
      products = result.data.products;
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Failed to fetch Bazaar Dor products:", error);

    


    return (
      <main className="min-h-screen bg-base-200 p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-base-100 p-6 shadow">
          <h1 className="text-3xl font-bold">চালের বাজারদর</h1>
          <p className="mt-4 text-error">
            বাজারদরের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="mb-8">
          <p className="font-medium text-primary">
            বাজারভিত্তিক মূল্য তুলনা
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            চালের বাজারদর 🍚
          </h1>

          <p className="mt-3 text-base-content/70">
            প্রতিটি পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় বাজারদর দেখুন।
          </p>
        </header>

        {/* Overall statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="stat rounded-2xl bg-base-100 shadow">
            <div className="stat-title">মোট পণ্য</div>
            <div className="stat-value text-primary">
              {products.length}
            </div>
          </div>

          <div className="stat rounded-2xl bg-base-100 shadow">
            <div className="stat-title">মোট বাজার-তালিকা</div>
            <div className="stat-value text-secondary">
              {products.reduce(
                (total, product) =>
                  total +
                  (Array.isArray(product.markets)
                    ? product.markets.length
                    : 0),
                0
              )}
            </div>
          </div>
        </div>

        {/* Product list */}
        {products.length === 0 ? (
          <div className="rounded-2xl bg-base-100 p-8 text-center shadow">
            <h2 className="text-xl font-bold">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="mt-2 text-base-content/70">
              বর্তমানে কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {products.map((product, index) => {
              // Validate market price records
              const markets = Array.isArray(product.markets)
                ? product.markets.filter(
                    (market) =>
                      Number.isFinite(market.min) &&
                      Number.isFinite(market.max) &&
                      market.min <= market.max
                  )
                : [];

              // Find the market with the lowest minimum price
              const lowestMarket =
                markets.length > 0
                  ? markets.reduce((lowest, market) =>
                      market.min < lowest.min ? market : lowest
                    )
                  : null;

              // Find the market with the highest maximum price
              const highestMarket =
                markets.length > 0
                  ? markets.reduce((highest, market) =>
                      market.max > highest.max ? market : highest
                    )
                  : null;

              // Average of the midpoint of each market's price range
              const averagePrice =
                markets.length > 0
                  ? markets.reduce(
                      (total, market) =>
                        total + (market.min + market.max) / 2,
                      0
                    ) / markets.length
                  : null;

              const changeDirection = product.change?.dir ?? "flat";

              const changeColor =
                changeDirection === "up"
                  ? "text-error"
                  : changeDirection === "down"
                    ? "text-success"
                    : "text-base-content/60";

              return (
                <section
                  key={product.id ?? product.slug ?? index}
                  className="overflow-hidden rounded-2xl bg-base-100 shadow"
                >
                  {/* Product title */}
                  <div className="border-b border-base-300 p-5">
                    <p className="text-sm font-medium text-primary">
                      {product.categoryNameBn || "চাল"}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {product.nameBn || "চালের পণ্য"}
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">
                      একক: {product.unit || "নির্ধারিত নয়"}
                    </p>
                  </div>

                  {/* Highest, lowest and average prices at the TOP */}
                  <div className="border-b border-base-300 bg-base-200/50 p-5">
                    <h3 className="mb-4 text-lg font-bold">
                      📊 {product.nameBn} — বাজারদরের সারসংক্ষেপ
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Lowest price */}
                      <div className="rounded-xl border border-success/30 bg-success/10 p-4">
                        <p className="text-sm font-medium text-success">
                          সর্বনিম্ন দাম
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {lowestMarket
                            ? `৳${lowestMarket.min}`
                            : "—"}
                        </p>

                        <p className="mt-2 text-sm">
                          {lowestMarket
                            ? `বাজার: ${lowestMarket.market}`
                            : "বাজারের তথ্য নেই"}
                        </p>

                        {lowestMarket && (
                          <p className="mt-1 text-xs text-base-content/60">
                            বিভাগ: {lowestMarket.division}
                          </p>
                        )}
                      </div>

                      {/* Highest price */}
                      <div className="rounded-xl border border-error/30 bg-error/10 p-4">
                        <p className="text-sm font-medium text-error">
                          সর্বোচ্চ দাম
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {highestMarket
                            ? `৳${highestMarket.max}`
                            : "—"}
                        </p>

                        <p className="mt-2 text-sm">
                          {highestMarket
                            ? `বাজার: ${highestMarket.market}`
                            : "বাজারের তথ্য নেই"}
                        </p>

                        {highestMarket && (
                          <p className="mt-1 text-xs text-base-content/60">
                            বিভাগ: {highestMarket.division}
                          </p>
                        )}
                      </div>

                      {/* Average price */}
                      <div className="rounded-xl border border-info/30 bg-info/10 p-4">
                        <p className="text-sm font-medium text-info">
                          গড় বাজারদর
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {averagePrice !== null
                            ? `৳${averagePrice.toFixed(2)}`
                            : "—"}
                        </p>

                        <p className="mt-2 text-sm">
                          {product.unit
                            ? `প্রতি ${product.unit}`
                            : "প্রতি একক"}
                        </p>

                        <p className="mt-1 text-xs text-base-content/60">
                          {markets.length}টি বাজারের গড়
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Today's and historical prices */}
                  <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
                    <div className="rounded-xl bg-base-200 p-3">
                      <p className="text-sm text-base-content/60">
                        আজকের দাম
                      </p>
                      <p className="mt-1 text-xl font-bold">
                        {Number.isFinite(product.today)
                          ? `৳${product.today}`
                          : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-base-200 p-3">
                      <p className="text-sm text-base-content/60">
                        গতকালের দাম
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        {Number.isFinite(product.yesterday)
                          ? `৳${product.yesterday}`
                          : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-base-200 p-3">
                      <p className="text-sm text-base-content/60">
                        গত সপ্তাহের দাম
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        {Number.isFinite(product.lastWeek)
                          ? `৳${product.lastWeek}`
                          : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-base-200 p-3">
                      <p className="text-sm text-base-content/60">
                        গত মাসের দাম
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        {Number.isFinite(product.lastMonth)
                          ? `৳${product.lastMonth}`
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Price change */}
                  <div className="px-5 pb-5">
                    <p className="text-sm text-base-content/60">
                      দামের পরিবর্তন
                    </p>

                    <p className={`mt-1 text-lg font-bold ${changeColor}`}>
                      {changeDirection === "up"
                        ? "▲ দাম বেড়েছে"
                        : changeDirection === "down"
                          ? "▼ দাম কমেছে"
                          : "— দাম অপরিবর্তিত"}

                      {" "}
                      {Number.isFinite(product.change?.pct)
                        ? `${product.change.pct}%`
                        : ""}
                    </p>
                  </div>

                  {/* Market-by-market price table */}
                  <div className="px-5 pb-5">
                    <h3 className="mb-4 text-lg font-bold">
                      🏪 {product.nameBn} — বাজারভিত্তিক মূল্য
                    </h3>

                    {markets.length === 0 ? (
                      <p className="rounded-xl bg-base-200 p-4 text-base-content/70">
                        এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                      </p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-base-300">
                        <table className="table table-zebra">
                          <thead>
                            <tr>
                              <th>বাজার</th>
                              <th>বিভাগ</th>
                              <th>সর্বনিম্ন দাম</th>
                              <th>সর্বোচ্চ দাম</th>
                            </tr>
                          </thead>

                          <tbody>
                            {markets.map((market, marketIndex) => (
                              <tr
                                key={`${product.id ?? product.slug ?? index}-${market.market}-${marketIndex}`}
                              >
                                <td className="font-medium">
                                  {market.market}
                                </td>

                                <td>{market.division || "—"}</td>

                                <td className="font-semibold text-success">
                                  ৳{market.min}
                                </td>

                                <td className="font-semibold text-error">
                                  ৳{market.max}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-base-content/60">
          <p>
            বাজারদরের তথ্য Programming Hero API থেকে সংগ্রহ করা হয়েছে।
          </p>
          <p className="mt-1">
            বাজারভেদে প্রকৃত বিক্রয়মূল্য ভিন্ন হতে পারে।
          </p>
        </footer>
      </div>
    </main>
  );
}
