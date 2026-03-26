import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getUserOrders } from '@/lib/orders'
import { signOut } from '@/lib/auth-actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const statusLabel: Record<string, { label: string; color: string }> = {
  pending: { label: 'Обрабатывается', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Подтверждён', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Отправлен', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Доставлен', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800' },
}

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const orders = await getUserOrders()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Мой аккаунт</h1>

      {/* Профиль */}
      <div className="border rounded-2xl p-6 flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="border rounded-xl px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Выйти
          </button>
        </form>
      </div>

      {/* Заказы */}
      <h2 className="text-xl font-bold mb-4">История заказов</h2>

      {orders.length === 0 ? (
        <div className="text-center py-16 border rounded-2xl">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-gray-500 mb-6">У вас пока нет заказов</p>
          <Link
            href="/catalog"
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            В каталог
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = statusLabel[order.status] || statusLabel.pending
            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="border rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-mono mb-1">{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <p className="font-bold text-lg">{order.total.toLocaleString()} $</p>
                  </div>
                </div>

                {/* Превью товаров */}
                <div className="flex gap-2">
                  {order.items.slice(0, 4).map((item, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0"
                    >
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        width={320}
                        height={320}
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500 shrink-0">
                      +{order.items.length - 4}
                    </div>
                  )}
                  <div className="ml-2 flex flex-col justify-center">
                    <p className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'товар' : 'товара'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}