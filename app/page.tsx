import { getProducts } from '@/lib/products'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const { products } = await getProducts({ page: 1 })
  const t = await getTranslations('home')

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">{product.categories?.name}</p>
              <h2 className="font-semibold mt-1">{product.name}</h2>
              <p className="text-lg font-bold mt-2">{product.price.toLocaleString()} $</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}