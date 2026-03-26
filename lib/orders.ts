import { createServerSupabaseClient } from "./supabase-server";

export type Order = {
  id: string;
  status: string;
  total: number;
  name: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  items: {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image_url: string;
  }[];
  created_at: string;
};

export async function getUserOrders(): Promise<Order[]> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) return null;
  return data;
}
