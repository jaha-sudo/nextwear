import { getOrderById } from '@/lib/orders'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: Promise<{ id: string }>
}

const statusLabel: Record<string, { label: string; color: string }> = {
  pending: { label: 'Обрабатывается', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Подтверждён', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Отправлен', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Доставлен', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800' },
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) notFound()

  const status = statusLabel[order.status] || statusLabel.pending

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">

      {/* Шапка */}
      <Link href="/account" className="text-sm text-gray-500 hover:text-black transition mb-6 inline-block">
        ← Назад к заказам
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Заказ</h1>
          <p className="text-xs text-gray-400 font-mono">{order.id}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.created_at).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`text-sm px-4 py-2 rounded-full font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Товары */}
      <div className="border rounded-2xl overflow-hidden mb-6">
        <div className="p-4 border-b bg-gray-50">
          <p className="font-semibold">Товары</p>
        </div>
        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4 items-center p-4 border-b last:border-0">
            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
                width={320}
                height={320}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Размер: {item.size} · {item.quantity} шт.</p>
            </div>
            <p className="font-bold">{(item.price * item.quantity).toLocaleString()} $</p>
          </div>
        ))}
        <div className="p-4 flex justify-between items-center bg-gray-50">
          <span className="font-semibold">Итого</span>
          <span className="text-xl font-bold">{order.total.toLocaleString()} $</span>
        </div>
      </div>

      {/* Доставка */}
      <div className="border rounded-2xl p-6">
        <p className="font-semibold mb-4">Данные доставки</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Получатель</p>
            <p className="font-medium">{order.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{order.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Город</p>
            <p className="font-medium">{order.city}</p>
          </div>
          <div>
            <p className="text-gray-500">Индекс</p>
            <p className="font-medium">{order.postal_code}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Адрес</p>
            <p className="font-medium">{order.address}</p>
          </div>
        </div>
      </div>

    </main>
  )
}