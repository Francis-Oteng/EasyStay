import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as wishlistService from '../services/wishlist.service';
import type { WishlistItem } from '../types';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(),
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: string) => wishlistService.addToWishlist(propertyId),
    onMutate: async (propertyId: string) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previous = queryClient.getQueryData<WishlistItem[]>(['wishlist']);
      return { previous };
    },
    onError: (_err, _propertyId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['wishlist'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: string) => wishlistService.removeFromWishlist(propertyId),
    onMutate: async (propertyId: string) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previous = queryClient.getQueryData<WishlistItem[]>(['wishlist']);
      if (previous) {
        queryClient.setQueryData(
          ['wishlist'],
          previous.filter((item) => item.propertyId !== propertyId),
        );
      }
      return { previous };
    },
    onError: (_err, _propertyId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['wishlist'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}