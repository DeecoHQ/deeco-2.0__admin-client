// types.ts
export type ProductSpecs = {
  id: number;  
  store_identifier?: string;
  product_name: string;
  product_description?: string;
  product_type: "physical product" | "digital product";
  product_image: { image_url: string } | null;
  real_price: number;
  discount?: number;
  discount_price?: number;
  stock?: number;
  rating: number;
};
