import type { NavLink, NavLinkWithIcon } from '../types/navigation';

export const publicNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const customerNav: NavLinkWithIcon[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'My Bookings', href: '/bookings', icon: 'CalendarCheck' },
  { label: 'Wishlist', href: '/wishlist', icon: 'Heart' },
  { label: 'Notifications', href: '/notifications', icon: 'Bell' },
  { label: 'Profile', href: '/profile', icon: 'User' },
];

export const ownerNav: NavLinkWithIcon[] = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: 'LayoutDashboard' },
  { label: 'Properties', href: '/owner/properties', icon: 'Building2' },
  { label: 'Bookings', href: '/owner/bookings', icon: 'CalendarCheck' },
  { label: 'Calendar', href: '/owner/calendar', icon: 'Calendar' },
  { label: 'Revenue', href: '/owner/revenue', icon: 'DollarSign' },
];