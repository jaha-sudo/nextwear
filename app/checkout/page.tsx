'use client'

import { useCartStore } from '@/store/cartStore'
import { createOrder } from '@/lib/order-actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
        <Link href="/catalog" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          В каталог
        </Link>
      </main>
    )
  }

  function validate(form: FormData) {
    const errs: Record<string, string> = {}
    if (!form.get('name')) errs.name = 'Введите имя'
    if (!form.get('email')) errs.email = 'Введите email'
    if (!form.get('address')) errs.address = 'Введите адрес'
    if (!form.get('city')) errs.city = 'Введите город'
    if (!form.get('postalCode')) errs.postalCode = 'Введите индекс'
    return errs
  }

  async function handleSubmit(formData: FormData) {
    const errs = validate(formData)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      await createOrder({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        postalCode: formData.get('postalCode') as string,
        total: totalPrice(),
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          size: i.size,
          quantity: i.quantity,
          image_url: i.product.image_url,
        })),
      })
      clearCart()
    } catch {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Форма */}
        <form action={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Данные доставки</h2>

          {[
            { name: 'name', label: 'Имя и фамилия', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'city', label: 'Город', type: 'text' },
            { name: 'address', label: 'Адрес', type: 'text' },
            { name: 'postalCode', label: 'Почтовый индекс', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${errors[field.name] ? 'border-red-500' : ''
                  }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white rounded-xl py-4 text-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Оформляем...' : `Оформить заказ · ${totalPrice().toLocaleString()} $`}
          </button>
        </form>

        {/* Товары */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-3 items-center border rounded-xl p-3"
              >
                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Размер: {item.size} · {item.quantity} шт.</p>
                </div>
                <p className="font-bold text-sm">
                  {(item.product.price * item.quantity).toLocaleString()} $
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="text-gray-500">Итого</span>
            <span className="text-2xl font-bold">{totalPrice().toLocaleString()} $</span>
          </div>
        </div>
      </div>
    </main>
  )
}