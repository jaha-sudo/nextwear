export const locales = ["tk", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tk";

export const localeNames: Record<Locale, string> = {
  tk: "Türkmen",
  ru: "Русский",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  tk: "🇹🇲",
  ru: "🇷🇺",
  en: "🇬🇧",
};
