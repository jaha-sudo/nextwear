'use client'

import { signInOrUp } from '@/lib/auth-actions'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const t = useTranslations("auth")
  const tr = useTranslations("checkout")


  return (
    <main className="max-w-md mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">{ }</h1>
      <p className="text-gray-500 mb-8">
        {t('subtitle')}</p>

      <form
        action={async (formData) => {
          setLoading(true)
          await signInOrUp(formData)
          setLoading(false)
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">{t('email')}</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('password')}</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-xl py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? tr('submitting') : t('submit')}
        </button>
      </form>
    </main>
  )
}