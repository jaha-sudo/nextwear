# NextWear 👟

A modern full-stack e-commerce store for clothing and footwear, built with Next.js 16 and Supabase.

---

## Tech Stack

| Layer                | Technology                |
| -------------------- | ------------------------- |
| Framework            | Next.js 16.2 (App Router) |
| Language             | TypeScript                |
| Styling              | Tailwind CSS              |
| Database & Auth      | Supabase                  |
| State Management     | Zustand                   |
| Internationalization | next-intl                 |
| Deployment           | Vercel                    |

---

## Features

- 🛍️ Product catalog with category filters and search
- ♾️ Infinite scroll with lazy loading
- 🛒 Shopping cart (persisted in localStorage via Zustand)
- 🔐 Authentication — sign in / sign up with a single form
- 📦 Checkout and order history
- 🌍 Multilingual UI — Turkmen (default), Russian, English
- 📱 Responsive design
- ⚡ Loading skeletons and error boundaries
- 🔍 SEO — dynamic metadata, sitemap, robots.txt

---

## Project Structure

```
nextwear/
├── app/
│   ├── (shop)/               # Public-facing pages
│   │   ├── catalog/          # Catalog + product pages
│   │   ├── cart/             # Shopping cart
│   │   ├── checkout/         # Checkout + success
│   │   └── account/          # User account + orders
│   ├── (auth)/               # Auth pages
│   │   └── login/
│   ├── api/
│   │   └── products/         # Route Handler for infinite scroll
│   ├── layout.tsx            # Root layout with header
│   ├── page.tsx              # Homepage
│   ├── not-found.tsx         # 404 page
│   ├── error.tsx             # Global error boundary
│   ├── sitemap.ts            # Auto-generated sitemap
│   └── robots.ts             # Robots.txt
├── components/
│   ├── AddToCartButton.tsx   # Client component — add to cart
│   ├── CartButton.tsx        # Header cart button with counter
│   ├── CatalogFilters.tsx    # Search + category sidebar
│   ├── ProductGrid.tsx       # Infinite scroll grid
│   └── LanguageSwitcher.tsx  # Language toggle
├── lib/
│   ├── supabase-public.ts    # Public Supabase client (catalog)
│   ├── supabase-server.ts    # Server Supabase client (auth/orders)
│   ├── products.ts           # Product queries
│   ├── orders.ts             # Order queries
│   ├── auth-actions.ts       # Auth Server Actions
│   ├── order-actions.ts      # Order Server Actions
│   └── product-actions.ts    # Admin Server Actions
├── store/
│   └── cartStore.ts          # Zustand cart store
├── types/
│   └── index.ts              # TypeScript types
├── i18n/
│   ├── config.ts             # Locale config
│   ├── request.ts            # next-intl server config
│   ├── actions.ts            # Set locale Server Action
│   └── messages/
│       ├── tk.json           # Turkmen translations
│       ├── ru.json           # Russian translations
│       └── en.json           # English translations
├── proxy.ts                  # Next.js Proxy (formerly Middleware)
└── next.config.ts
```

---

## Database Schema (Supabase)

```sql
categories       -- id, name, name_ru, name_en, slug
products         -- id, name, name_ru, name_en, description, price,
                 -- image_url, category_id, sizes[], in_stock
cart_items       -- id, user_id, product_id, size, quantity
orders           -- id, user_id, status, total, name, email,
                 -- address, city, postal_code, items (jsonb)
profiles         -- id, role (user | admin)
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/nextwear.git
cd nextwear
yarn
```

### 2. Set up environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from: **Supabase Dashboard → Settings → API**

### 3. Run the dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What is Supabase?

Supabase is an open-source backend platform — think of it as Firebase, but built on PostgreSQL.

It gives you out of the box:

- **PostgreSQL database** — a real relational database with tables, foreign keys, and SQL queries
- **Authentication** — email/password, OAuth (Google, GitHub, etc.), magic links
- **Storage** — file uploads (images, documents)
- **Auto-generated REST and GraphQL API** — query your database directly from the frontend without writing a backend
- **Realtime** — subscribe to database changes via WebSockets

In this project Supabase is used for:

- Storing products, categories, orders
- User authentication (sign up / sign in)
- Protecting user data (each user only sees their own orders)

Supabase has a **free tier** that is enough for small to medium projects.

---

## Replacing Supabase with Your Own Backend

If you already have a backend API (REST or GraphQL), you can replace Supabase queries with your own fetch calls. Here is how:

### 1. Product queries (`lib/products.ts`)

Replace Supabase calls with your API:

```ts
// Before (Supabase)
const { data } = await supabase
  .from("products")
  .select("*, categories(*)")
  .eq("in_stock", true);

// After (your backend)
const res = await fetch("https://your-api.com/products?in_stock=true", {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
```

### 2. Authentication (`lib/auth-actions.ts`)

Replace Supabase Auth with your own auth flow:

```ts
// Before (Supabase)
const { error } = await supabase.auth.signInWithPassword({ email, password });

// After (your backend)
const res = await fetch("https://your-api.com/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
  headers: { "Content-Type": "application/json" },
});
const { token } = await res.json();
// Store token in cookie
```

### 3. Orders (`lib/orders.ts` and `lib/order-actions.ts`)

```ts
// Before (Supabase)
const { data } = await supabase
  .from("orders")
  .select("*")
  .eq("user_id", user.id);

// After (your backend)
const res = await fetch("https://your-api.com/orders", {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
```

### 4. Session management (`lib/supabase-server.ts`)

The server client in `lib/supabase-server.ts` handles session cookies. If you use your own auth, replace it with a helper that reads your JWT from cookies:

```ts
import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}
```

Then use `getAuthToken()` wherever `createServerSupabaseClient()` is currently used.

### 5. Proxy / Middleware (`proxy.ts`)

Update the route protection logic to validate your own token instead of Supabase session:

```ts
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**

Your store will be live at `your-project.vercel.app` in ~2 minutes.

---

## Scripts

```bash
yarn dev        # Start dev server
yarn build      # Production build
yarn start      # Start production server
yarn lint       # Run ESLint
```

---

## Languages

The UI is available in three languages. The default is Turkmen.

| Code | Language | Flag |
| ---- | -------- | ---- |
| `tk` | Türkmen  | 🇹🇲   |
| `ru` | Русский  | 🇷🇺   |
| `en` | English  | 🇬🇧   |

Translation files are located in `i18n/messages/`. To add a new language, create a new JSON file and add the locale to `i18n/config.ts`.

---

## License

MIT
