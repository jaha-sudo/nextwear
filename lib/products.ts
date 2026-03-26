import { supabasePublic as supabase } from "./supabase-public";
import { Product } from "@/types";

type ProductFilters = {
  category?: string;
  search?: string;
  page?: number;
};

const PAGE_SIZE = 12;

export async function getProducts(filters: ProductFilters = {}): Promise<{
  products: Product[];
  hasMore: boolean;
}> {
  try {
    const page = filters.page || 1;
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("products")
      .select("*, categories(*)")
      .eq("in_stock", true)
      .order("created_at", { ascending: false })
      .range(from, to + 1);

    if (filters.category) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", filters.category)
        .single();

      if (category) {
        query = query.eq("category_id", category.id);
      } else {
        return { products: [], hasMore: false };
      }
    }

    if (filters.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    const products = (data || []).slice(0, PAGE_SIZE);
    const hasMore = (data || []).length > PAGE_SIZE;

    return { products, hasMore };
  } catch (err) {
    console.error("getProducts error:", err);
    return { products: [], hasMore: false };
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw new Error(error.message);
    return data || [];
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.error("getProductById error:", err);
    return null;
  }
}
