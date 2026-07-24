export type UserRole = 'CUSTOMER' | 'OWNER';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  city: string;
  country: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  isPublished: boolean;
  latitude?: number;
  longitude?: number;
  ownerId: string;
  owner?: User;
  images: PropertyImage[];
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  publicId?: string;
  isPrimary: boolean;
  propertyId: string;
}

export interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  customerId: string;
  customer?: User;
  propertyId: string;
  property?: Property;
  payment?: Payment;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Payment {
  id: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  transactionId?: string;
  bookingId: string;
  createdAt: string;
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Availability {
  id: string;
  date: string;
  isAvailable: boolean;
  propertyId: string;
}

export interface WishlistItem {
  id: string;
  customerId: string;
  propertyId: string;
  property: Property;
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  customer?: User;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  userId: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}