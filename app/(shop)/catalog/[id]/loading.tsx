export default function ProductLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Фото скелетон */}
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />

        {/* Инфо скелетон */}
        <div className="flex flex-col gap-4">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-7 w-28 bg-gray-200 rounded animate-pulse" />

          {/* Размеры скелетон */}
          <div className="flex gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-14 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>

          {/* Кнопка скелетон */}
          <div className="h-14 bg-gray-200 rounded-xl animate-pulse mt-2" />
        </div>

      </div>
    </main>
  )
}