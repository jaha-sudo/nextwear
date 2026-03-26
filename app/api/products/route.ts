import { getProducts } from "@/lib/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  const result = await getProducts({ page, category, search });
  return Response.json(result);
}
