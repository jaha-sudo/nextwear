'use client'

import { useTransition } from 'react'
import { setLocale } from '@/i18n/actions'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { useState } from 'react'

type Props = {
  currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  function handleChange(locale: Locale) {
    setOpen(false)
    startTransition(() => setLocale(locale))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 transition disabled:opacity-50"
      >
        <span>{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 border rounded-xl bg-white shadow-lg overflow-hidden z-50 min-w-36">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleChange(locale)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition ${
                locale === currentLocale ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <span>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}