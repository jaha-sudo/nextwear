import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { getTranslations, getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { type Locale } from '@/i18n/config'
import Link from 'next/link'
import CartButton from '@/components/CartButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import './globals.css'
import Script from 'next/script'
import Analytics from '@/components/Analytics'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NextWear',
    template: '%s | NextWear',
  },
  description: 'NextWear — online fashion store',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations('nav')
  const locale = await getLocale() as Locale
  const messages = await getMessages()

  const GA_ID = "G-1HN3PEMC8Y";

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={geist.className}>
        <Analytics />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <header className="border-b sticky top-0 bg-white z-10">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="text-xl font-bold">
                NextWear 👟
              </Link>
              <nav className="flex gap-4 items-center">
                <Link href="/catalog" className="hover:text-gray-500 transition text-sm">
                  {t('catalog')}
                </Link>
                <Link href="/account" className="hover:text-gray-500 transition text-sm">
                  {t('account')}
                </Link>
                <CartButton />
                <LanguageSwitcher currentLocale={locale} />
              </nav>
            </div>
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}