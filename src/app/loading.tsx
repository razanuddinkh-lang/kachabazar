
export default function Loading() {
  return (
    <main className="market-container py-10">
      <div className="skeleton mb-6 h-10 w-64" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rounded-2xl bg-white p-4">
            <div className="skeleton h-12 w-12" />
            <div className="skeleton mt-4 h-5 w-3/4" />
            <div className="skeleton mt-3 h-4 w-1/2" />
            <div className="skeleton mt-6 h-8 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  );
}
