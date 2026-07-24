import { get, post, del } from './api';
import type { WishlistItem, ApiResponse } from '../types';

export async function getWishlist(): Promise<WishlistItem[]> {
  const response = await get<ApiResponse<WishlistItem[]>>('/wishlist');
  return response.data as WishlistItem[];
}

export async function addToWishlist(propertyId: string): Promise<WishlistItem> {
  const response = await post<ApiResponse<WishlistItem>>('/wishlist', { propertyId });
  return response.data as WishlistItem;
}

export async function removeFromWishlist(propertyId: string): Promise<void> {
  await del(`/wishlist/${propertyId}`);
}