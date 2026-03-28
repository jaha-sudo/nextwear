"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { type Locale, locales } from "./config";

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();

  if (!locales.includes(locale)) return;

  cookieStore.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 год
    path: "/",
  });

  revalidatePath("/", "layout");
}
