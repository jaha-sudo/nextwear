import { createServerSupabaseClient } from '@/lib/supabase-server'
import { signOut } from '@/lib/auth-actions'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Мой аккаунт</h1>

      <div className="border rounded-2xl p-6 flex items-center justify-between">
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
    </main>
  )
}