import { supabasePublic } from "@/lib/supabase-public";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabasePublic
    .from("products")
    .select("id, created_at");

  const productUrls = (products || []).map((p) => ({
    url: `https://nextwear.vercel.app/catalog/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://nextwear.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://nextwear.vercel.app/catalog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productUrls,
  ];
}
