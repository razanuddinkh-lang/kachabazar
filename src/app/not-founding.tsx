
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="market-container flex min-h-[75vh] items-center justify-center py-12">
      <div className="text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-5 text-4xl font-bold text-[#163e32]">
          404 — পৃষ্ঠা পাওয়া যায়নি
        </h1>
        <p className="mt-4 text-gray-400">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি এখানে নেই।
        </p>
        <Link href="/"
          className="btn mt-6 border-0 bg-[#163e32] text-white">
          Go back to home page
        </Link>
      </div>
    </main>
  );
}
