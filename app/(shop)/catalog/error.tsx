'use client'

import { useTranslations } from "next-intl"

export default function CatalogError({ reset }: { reset: () => void }) {
  const t = useTranslations('errors')
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-5xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold mb-2">Не удалось загрузить каталог</h1>
      <p className="text-gray-500 mb-8">Проблема с подключением к базе данных</p>
      <button
        onClick={reset}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        {t('tryAgain')}
      </button>
    </main>
  )
}