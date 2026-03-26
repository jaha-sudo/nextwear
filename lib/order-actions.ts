"use server";

import { createServerSupabaseClient } from "./supabase-server";
import { redirect } from "next/navigation";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image_url: string;
};

type CreateOrderData = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  total: number;
};

export async function createOrder(data: CreateOrderData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id || null,
      total: data.total,
      name: data.name,
      email: data.email,
      address: data.address,
      city: data.city,
      postal_code: data.postalCode,
      items: data.items,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  redirect(`/checkout/success?orderId=${order.id}`);
}
