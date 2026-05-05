export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CategoryListResponse {
  categories: Category[];
}