import type { NavLink, SectionSummary } from '../types/navigation';

export const publicNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Search rooms', href: '/rooms' },
  { label: 'Book a stay', href: '/bookings/new' },
];

export const guestNav: NavLink[] = [
  { label: 'Dashboard', href: '/guest' },
  { label: 'My bookings', href: '/guest/bookings' },
  { label: 'Profile', href: '/guest/profile' },
];

export const adminNav: NavLink[] = [
  { label: 'Overview', href: '/admin' },
  { label: 'Rooms', href: '/admin/rooms' },
  { label: 'Bookings', href: '/admin/bookings' },
];

export const productSections: SectionSummary[] = [
  {
    title: 'Public booking flow',
    description: 'Search, compare, and book rooms with a clean path from discovery to checkout.',
    items: ['Homepage', 'Search results', 'Room detail', 'Booking checkout'],
  },
  {
    title: 'Guest account area',
    description: 'Let guests review reservations, payment status, and profile details without friction.',
    items: ['Guest home', 'Reservation history', 'Booking detail', 'Profile settings'],
  },
  {
    title: 'Admin dashboard',
    description: 'Support staff with dense, readable controls for inventory, bookings, and pricing.',
    items: ['Admin overview', 'Room inventory', 'Bookings table', 'Availability controls'],
  },
];