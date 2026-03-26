'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalCount } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
        <p className="text-gray-500 mb-8">Добавьте что-нибудь из каталога</p>
        <Link
          href="/catalog"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          В каталог
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Корзина · {totalCount()} товара
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size}`}
            className="flex gap-4 border rounded-2xl p-4 items-center"
          >
            {/* Фото */}
            <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.product.image_url}
                alt={item.product.name}
                fill
                sizes='80px'
                className="object-cover"
              />
            </div>

            {/* Инфо */}
            <div className="flex-1">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-500">Размер: {item.size}</p>
              <p className="font-bold mt-1">
                {(item.product.price * item.quantity).toLocaleString()} ₽
              </p>
            </div>

            {/* Количество */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            {/* Удалить */}
            <button
              onClick={() => removeItem(item.product.id, item.size)}
              className="text-gray-400 hover:text-red-500 transition text-xl ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Итого */}
      <div className="border rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500">Итого</p>
          <p className="text-3xl font-bold">{totalPrice().toLocaleString()} ₽</p>
        </div>
        <Link
          href="/checkout"
          className="bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
        >
          Оформить заказ →
        </Link>
      </div>
    </main>
  )
}