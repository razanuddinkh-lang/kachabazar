
import type { MarketProduct } from "@/types/product";
import { percent, taka } from "@/lib/format";

export default function PriceTicker({
  products,
}: {
  products: MarketProduct[];
}) {
  if (!products.length) return null;

  // Duplicate the list to create a continuous scrolling strip.
  const items = [...products, ...products];

  return (
    <section
      aria-label="আজকের বাজারদর"
      className="overflow-hidden bg-[#244b3d] py-3 text-white"
    >
      <div className="ticker-track flex w-max items-center gap-8">
        {items.map((product, index) => {
          const direction = product.change?.dir;
          const changeValue = product.change?.pct ?? 0;

          const isUp = direction === "up";
          const isDown = direction === "down";

          return (
            <span
              key={`${product.id}-${index}`}
              className="whitespace-nowrap text-sm"
            >
              <span aria-hidden="true">
                {product.image || "🛒"}
              </span>{" "}

              <span className="font-medium">
                {product.nameBn}
              </span>{" "}

              <span>
                {taka(product.today)}/{product.unit}
              </span>{" "}

              <span
                className={
                  isUp
                    ? "font-semibold text-red-300"
                    : isDown
                      ? "font-semibold text-lime-300"
                      : "text-gray-300"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
                {percent(changeValue)}
              </span>
            </span>
          );
        })}
      </div>

      <style >{`
        .ticker-track {
          animation: ticker-scroll 70s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
