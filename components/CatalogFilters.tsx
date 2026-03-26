'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'

type Props = {
  categories: Category[]
}

export default function CatalogFilters({ categories }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentSearch = searchParams.get('search') || ''

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Поиск */}
      <div>
        <p className="font-semibold mb-2">Поиск</p>
        <input
          type="text"
          placeholder="Найти товар..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Категории */}
      <div>
        <p className="font-semibold mb-2">Категория</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`text-left px-3 py-2 rounded-lg text-sm transition ${!currentCategory ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
          >
            Все товары
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.slug)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition ${currentCategory === cat.slug ? 'bg-black text-white' : 'hover:bg-gray-100'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}