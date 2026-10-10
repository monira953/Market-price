
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-6 h-5 w-40 rounded bg-gray-200" />

        <section className="mb-8 rounded-3xl border border-[#e0e9e1] bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-gray-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="h-8 w-48 rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
            </div>
          </div>
        </section>

        <div className="mb-6 flex justify-between gap-4">
          <div className="h-7 w-28 rounded bg-gray-200" />
          <div className="h-9 w-48 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-4 h-32 rounded-xl bg-gray-200" />
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-5 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-8 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}