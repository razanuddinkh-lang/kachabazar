import Image from "next/image";
export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#e9efdf]">
      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div>
          <p className="mb-4 font-semibold text-[#38724e]">
            🌿 আপনার প্রতিদিনের বাজার সহায়ক
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-[#163e32] sm:text-5xl">
            প্রতিদিনের বাজারদর,
            <span className="block text-[#63852d]">
              এক নজরে।
            </span>
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-gray-600">
            চাল, ডাল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
            পণ্যের দাম সহজেই দেখুন।
          </p>

          <a href="#all-products"
            className="btn mt-7 border-0 bg-[#163e32] text-white hover:bg-[#285c47]">
            সব পণ্যের দাম দেখুন ↓
          </a>
        </div>

        {/*<div className="flex min-h-56 items-center justify-center rounded-3xl bg-[#d9f36a] p-8">
           <div className="grid grid-cols-3 gap-4 text-5xl sm:text-7xl">
           <span>🍚</span><span>🥬</span><span>🧅</span>
            <span>🥔</span><span>🐟</span><span>🥚</span>
            <span>🌶️</span><span>🫘</span><span>🧄</span>
          </div> 
        </div>*/}

          <div className="relative mx-auto w-full max-w-xl">
          <Image
            src="/bazar-hero 1.png"
            alt="Hero section illustration"
            width={700}
            height={500}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}
