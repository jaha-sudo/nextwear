'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-5xl mb-4">😕</p>
      <h1 className="text-2xl font-bold mb-2">Что-то пошло не так</h1>
      <p className="text-gray-500 mb-8">Не удалось загрузить данные</p>
      <button
        onClick={reset}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Попробовать снова
      </button>
    </main>
  )
}