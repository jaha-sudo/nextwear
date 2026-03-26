'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useSyncExternalStore } from 'react'

function useIsClient() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  )
}

export default function CartButton() {
  const totalCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  )
  const isClient = useIsClient()

  return (
    <Link
      href="/cart"
      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition relative"
    >
      Корзина
      {isClient && totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalCount}
        </span>
      )}
    </Link>
  )
}