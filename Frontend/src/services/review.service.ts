import { get, post, del } from './api';
import type { Review, ApiResponse } from '../types';

interface CreateReviewData {
  propertyId: string;
  rating: number;
  comment: string;
}

export async function getPropertyReviews(propertyId: string): Promise<Review[]> {
  const response = await get<ApiResponse<Review[]>>(`/reviews/property/${propertyId}`);
  return response.data as Review[];
}

export async function createReview(data: CreateReviewData): Promise<Review> {
  const response = await post<ApiResponse<Review>>('/reviews', data);
  return response.data as Review;
}

export async function deleteReview(id: string): Promise<void> {
  await del(`/reviews/${id}`);
}