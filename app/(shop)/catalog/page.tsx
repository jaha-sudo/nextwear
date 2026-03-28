import { getProducts, getCategories } from '@/lib/products'
import { getTranslations } from 'next-intl/server'
import CatalogFilters from '@/components/CatalogFilters'
import ProductGrid from '@/components/ProductGrid'

export const dynamic = 'force-dynamic'

type Props = {
  searchParams: Promise<{ category?: string; search?: string }>
}

export const metadata = {
  title: 'Каталог',
  description: 'Весь ассортимент NextWear — кроссовки, куртки, футболки, джинсы и аксессуары.',
}


export default async function CatalogPage({ searchParams }: Props) {
  const { category, search } = await searchParams
  const t = await getTranslations('catalog')

  const [{ products, hasMore }, categories] = await Promise.all([
    getProducts({ category, search, page: 1 }),
    getCategories(),
  ])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="flex gap-8">
        <aside className="w-56 shrink-0">
          <CatalogFilters categories={categories} />
        </aside>
        <div className="flex-1">
          <ProductGrid
            key={`${category}-${search}`}
            initialProducts={products}
            initialHasMore={hasMore}
            category={category}
            search={search}
          />
        </div>
      </div>
    </main>
  )
}