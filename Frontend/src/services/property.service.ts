import { get, post, put, del } from './api';
import type { Property, PropertyImage, PaginatedResponse, ApiResponse } from '../types';

interface PropertyFilters {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  page?: number;
  limit?: number;
  search?: string;
}

export async function getProperties(filters?: PropertyFilters): Promise<PaginatedResponse<Property>> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  const query = params.toString();
  return get<PaginatedResponse<Property>>(`/properties${query ? `?${query}` : ''}`);
}

export async function getPropertyById(id: string): Promise<Property> {
  const response = await get<ApiResponse<Property>>(`/properties/${id}`);
  return response.data as Property;
}

export async function getMyProperties(): Promise<Property[]> {
  const response = await get<ApiResponse<Property[]>>('/properties/my');
  return response.data as Property[];
}

export async function createProperty(data: Partial<Property>): Promise<Property> {
  const response = await post<ApiResponse<Property>>('/properties', data);
  return response.data as Property;
}

export async function updateProperty(id: string, data: Partial<Property>): Promise<Property> {
  const response = await put<ApiResponse<Property>>(`/properties/${id}`, data);
  return response.data as Property;
}

export async function deleteProperty(id: string): Promise<void> {
  await del(`/properties/${id}`);
}

export async function uploadImages(id: string, formData: FormData): Promise<PropertyImage[]> {
  const response = await post<ApiResponse<PropertyImage[]>>(`/properties/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data as PropertyImage[];
}

export async function deleteImage(propertyId: string, imageId: string): Promise<void> {
  await del(`/properties/${propertyId}/images/${imageId}`);
}

export async function togglePublish(id: string): Promise<Property> {
  const response = await put<ApiResponse<Property>>(`/properties/${id}/publish`);
  return response.data as Property;
}