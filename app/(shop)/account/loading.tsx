export default function AccountLoading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
      <div className="border rounded-2xl p-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-9 w-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </main>
  )
}