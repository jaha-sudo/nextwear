'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  initialProducts: Product[]
  initialHasMore: boolean
  category?: string
  search?: string
}

export default function ProductGrid({
  initialProducts,
  initialHasMore,
  category,
  search,
}: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isPending, startTransition] = useTransition()
  const loaderRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef(1)

  async function loadMore() {
    const nextPage = pageRef.current + 1
    const params = new URLSearchParams({ page: String(nextPage) })
    if (category) params.set('category', category)
    if (search) params.set('search', search)

    startTransition(async () => {
      const res = await fetch(`/api/products?${params}`)
      const data = await res.json()
      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newProducts = data.products.filter((p: Product) => !existingIds.has(p.id))
        return [...prev, ...newProducts]
      })
      setHasMore(data.hasMore)
      pageRef.current = nextPage
    })
  }

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPending) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, isPending])



  if (products.length === 0) {
    return (
      <p className="text-gray-500 mt-12 text-center">Ничего не найдено 😕</p>
    )
  }

  return (
    <div>
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">{product.categories?.name}</p>
              <h2 className="font-semibold mt-1">{product.name}</h2>
              <p className="text-lg font-bold mt-2">
                {product.price.toLocaleString()} $
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div ref={loaderRef} className="mt-8 flex justify-center">
        {isPending && (
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}