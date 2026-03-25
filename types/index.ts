export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  sizes: string[];
  in_stock: boolean;
  created_at: string;
  categories?: Category;
};
