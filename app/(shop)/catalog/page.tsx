import { getProducts, getCategories } from '@/lib/products'
import CatalogFilters from '@/components/CatalogFilters'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const { category, search } = await searchParams

  const [products, categories] = await Promise.all([
    getProducts({ category, search }),
    getCategories(),
  ])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог</h1>

      <div className="flex gap-8">

        {/* Сайдбар с фильтрами */}
        <aside className="w-56 shrink-0">
          <CatalogFilters categories={categories} />
        </aside>

        {/* Товары */}
        <div className="flex-1">
          {products.length === 0 ? (
            <p className="text-gray-500 mt-12 text-center">Ничего не найдено 😕</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.id}`}
                  className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes='192px'
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">{product.categories?.name}</p>
                    <h2 className="font-semibold mt-1">{product.name}</h2>
                    <p className="text-lg font-bold mt-2">{product.price.toLocaleString()} ₽</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}