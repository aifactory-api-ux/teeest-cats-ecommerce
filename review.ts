export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
}

export interface ReviewListResponse {
  reviews: Review[];
}