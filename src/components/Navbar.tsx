
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { banglaDate as getBanglaDate } from "@/lib/format";
import type { MarketCategory } from "@/types/product";

export default function Navbar({
  categories,
}: {
  categories: MarketCategory[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [englishDate, setEnglishDate] = useState("");
  const [banglaDateText, setBanglaDateText] = useState("");

  useEffect(() => {
    const now = new Date();

    setEnglishDate(
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
      }).format(now)
    );

    setBanglaDateText(getBanglaDate());
  }, []);

  async function logout() {
    const result = await authClient.signOut();

    if (result.error) {
      toast.error("লগ আউট করা যায়নি");
      return;
    }

    toast.success("সফলভাবে লগ আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  function isCategoryActive(slug: string) {
    return pathname === `/category/${encodeURIComponent(slug)}` ||
      pathname === `/category/${slug}`;
  }

  const activeButton =
    "shrink-0 rounded-full bg-[#d9f36a] text-[#163e32] font-bold";

  const inactiveButton =
    "shrink-0 rounded-full text-black hover:bg-white/10";

  return (
    <header className="bg-[#163e32] text-white">
      {/* First row: Logo, dates and authentication */}
      <div className="market-container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">
            🛒
          </span>

          <span>
            <span className="block text-xl font-bold">
              বাজারদর
            </span>

            <span className="block text-xs text-green-100">
              {englishDate || "Today's Market"}
            </span>

            <span className="mt-1 block text-sm text-[#d9f36a]">
              {banglaDateText || "বাংলা তারিখ"}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session ? (
            <>
              <Link
                href="/profile"
                className="flex max-w-48 items-center gap-2 rounded-lg border border-white/20 px-3 py-2 hover:bg-white/10"
              >
                <span aria-hidden="true">👤</span>

                <span className="max-w-32 truncate text-sm">
                  {session.user.name || session.user.email || "প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                className="btn btn-sm border-0 bg-[#d9f36a] text-[#163e32]"
                onClick={logout}
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="btn btn-sm btn-ghost text-white"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="btn btn-sm border-0 bg-[#d9f36a] text-[#163e32]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Second row: Category navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-t border-white/15"
      >
        <div className="market-container flex gap-2 overflow-x-auto py-3">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`btn btn-sm ${
              pathname === "/" ? activeButton : inactiveButton
            }`}
          >
            সব পণ্য
          </Link>

          {categories.map((category) => {
            const active = isCategoryActive(category.slug);

            return (
              <Link
                key={category.slug}
                href={`/category/${encodeURIComponent(category.slug)}`}
                aria-current={active ? "page" : undefined}
                className={`btn btn-sm ${
                  active ? activeButton : inactiveButton
                }`}
              >
                {category.icon} {category.nameBn || category.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
