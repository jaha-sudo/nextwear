import Link from 'next/link'
import ClearCart from './ClearCart'

type Props = {
  searchParams: Promise<{ orderId?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams

  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <ClearCart />
      <p className="text-6xl mb-6">🎉</p>
      <h1 className="text-3xl font-bold mb-4">Заказ оформлен!</h1>
      <p className="text-gray-500 mb-2">Спасибо за покупку.</p>
      {orderId && (
        <p className="text-sm text-gray-400 mb-8">
          Номер заказа: <span className="font-mono">{orderId}</span>
        </p>
      )}
      <div className="flex gap-4 justify-center">
        <Link href="/account/orders" className="border rounded-xl px-6 py-3 hover:bg-gray-100 transition">
          Мои заказы
        </Link>
        <Link href="/catalog" className="bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition">
          Продолжить покупки
        </Link>
      </div>
    </main>
  )
}