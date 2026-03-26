import { supabase } from "./supabase";
import { Product } from "@/types";

type ProductFilters = {
  category?: string;
  search?: string;
};

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*, categories(*)")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("categories.slug", filters.category);
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
