'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useTranslations } from 'next-intl'
import { Product } from '@/types'

type Props = {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const t = useTranslations('product')

  function handleAdd() {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold mb-2">{t('size')}:</p>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border rounded-lg px-4 py-2 transition ${selectedSize === size
                ? 'bg-black text-white border-black'
                : 'hover:border-black'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-sm text-gray-400 mt-1">Выберите размер</p>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={!selectedSize}
        className={`rounded-xl py-4 text-lg font-semibold transition ${added
          ? 'bg-green-500 text-white'
          : 'bg-black text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
      >
        {added ? t('added') : t('addToCart')}
      </button>
    </div>
  )
}