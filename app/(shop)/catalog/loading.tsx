export default function CatalogLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-8" />

      <div className="flex gap-8">
        {/* Сайдбар скелетон */}
        <aside className="w-56 shrink-0 flex flex-col gap-4">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </aside>

        {/* Товары скелетон */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}