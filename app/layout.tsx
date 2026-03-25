import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextWear — одежда и обувь',
  description: 'Современный магазин одежды и обуви',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={geist.className}>

        {/* Шапка */}
        <header className="border-b sticky top-0 bg-white z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              NextWear 👟
            </Link>
            <nav className="flex gap-6 items-center">
              <Link href="/catalog" className="hover:text-gray-500 transition">
                Каталог
              </Link>
              <Link href="/account" className="hover:text-gray-500 transition">
                Аккаунт
              </Link>
              <Link
                href="/cart"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Корзина
              </Link>
            </nav>
          </div>
        </header>

        {children}

      </body>
    </html>
  )
}