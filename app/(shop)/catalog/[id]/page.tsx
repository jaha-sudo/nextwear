import { getProductById } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
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
            sizes='384px'
            className="object-cover"
          />
        </div>

        {/* Инфо */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{product.categories?.name}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold">{product.price.toLocaleString()} ₽</p>
          <AddToCartButton product={product} />
        </div>

      </div>
    </main>
  )
}