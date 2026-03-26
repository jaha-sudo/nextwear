export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
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
    </main>
  )
}