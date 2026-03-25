import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-8">Страница не найдена</p>
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        На главную
      </Link>
    </main>
  )
}