
export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-8">
        <div className="h-5 w-32 rounded bg-gray-200" />

        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="mt-5 h-10 w-64 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-full max-w-xl rounded bg-gray-200" />
          <div className="mt-8 h-12 w-48 rounded bg-gray-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-36 rounded-2xl bg-white"
            />
          ))}
        </div>

        <div className="h-64 rounded-2xl bg-white" />
      </div>
    </main>
  );
}