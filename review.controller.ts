import { Controller, Get, Post, Body, Param, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review, CreateReviewDto, ReviewListResponse } from '../shared/dtos/review.dto';

@Controller('api/products')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':productId/reviews')
  async getReviews(@Param('productId') productId: string): Promise<ReviewListResponse> {
    return this.reviewService.getReviews(productId);
  }

  @Post(':productId/reviews')
  @HttpCode(HttpStatus.CREATED)
  async addReview(
    @Param('productId') productId: string,
    @Headers('authorization') authHeader: string,
    @Body() createReviewDto: CreateReviewDto
  ): Promise<Review> {
    const token = authHeader?.replace('Bearer ', '');
    return this.reviewService.addReview(productId, token, createReviewDto);
  }
}