import { getProductById } from '@/lib/products'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Фото */}
        <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Инфо */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{product.categories?.name}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold">{product.price.toLocaleString()} ₽</p>

          {/* Размеры */}
          <div>
            <p className="font-semibold mb-2">Размер:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border rounded-lg px-4 py-2 hover:border-black transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопка */}
          <button className="mt-4 bg-black text-white rounded-xl py-4 text-lg font-semibold hover:bg-gray-800 transition">
            Добавить в корзину
          </button>
        </div>

      </div>
    </main>
  )
}