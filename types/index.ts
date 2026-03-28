export type Category = {
  id: string;
  name: string;
  name_ru?: string;
  name_en?: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  name_ru?: string;
  name_en?: string;
  name_tk?: string;
  description: string;
  description_ru?: string;
  description_en?: string;
  description_tk?: string;
  price: number;
  image_url: string;
  category_id: string;
  sizes: string[];
  in_stock: boolean;
  created_at: string;
  categories?: Category;
};
