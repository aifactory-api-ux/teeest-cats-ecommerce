import { Injectable } from '@nestjs/common';
import { Review, CreateReviewDto, ReviewListResponse } from '../shared/dtos/review.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewService {
  private reviews: Map<string, Review> = new Map();

  constructor() {
    this.seedReviews();
  }

  private seedReviews() {
    const now = new Date().toISOString();
    const sampleReviews: Review[] = [
      { id: uuidv4(), productId: 'prod-1', userId: 'user-1', rating: 5, comment: 'Excellent product!', createdAt: now },
      { id: uuidv4(), productId: 'prod-1', userId: 'user-2', rating: 4, comment: 'Very good, would recommend.', createdAt: now },
      { id: uuidv4(), productId: 'prod-2', userId: 'user-1', rating: 5, comment: 'Amazing quality!', createdAt: now },
    ];
    sampleReviews.forEach(r => this.reviews.set(r.id, r));
  }

  private getUserIdFromToken(token: string): string {
    try {
      const payload = Buffer.from(token.split('.')[1], 'base64').toString();
      const decoded = JSON.parse(payload);
      return decoded.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }

  async getReviews(productId: string): Promise<ReviewListResponse> {
    const productReviews = Array.from(this.reviews.values())
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { reviews: productReviews };
  }

  async addReview(productId: string, token: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const userId = this.getUserIdFromToken(token);
    const now = new Date().toISOString();

    const review: Review = {
      id: uuidv4(),
      productId,
      userId,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      createdAt: now,
    };

    this.reviews.set(review.id, review);
    return review;
  }
}