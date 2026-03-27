import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import CartButton from '@/components/CartButton'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NextWear — одежда и обувь',
    template: '%s | NextWear',
  },
  description: 'Современный магазин одежды и обуви. Кроссовки, куртки, футболки и аксессуары.',
  keywords: ['одежда', 'обувь', 'кроссовки', 'куртки', 'интернет-магазин'],
  openGraph: {
    siteName: 'NextWear',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={geist.className}>
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
              <CartButton />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}