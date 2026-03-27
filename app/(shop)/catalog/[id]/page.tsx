import { getProductById } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

// Динамические метатеги для каждого товара
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) return { title: 'Товар не найден' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image_url,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{product.categories?.name}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold">{product.price.toLocaleString()} $</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  )
}