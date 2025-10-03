// types.ts
export type CategorySpecs = {
  id: number;
  category_name: string;
  category_description: string;
  category_image?: { image_url: string } | null;
};