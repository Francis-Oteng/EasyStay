import {
  AdminDashboardPage,
  BookingCheckoutPage,
  GuestHomePage,
  HomePage,
  NotFoundPage,
  RoomsPage,
} from '../pages';

export function AppRouter() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/') return <HomePage />;
  if (path === '/rooms') return <RoomsPage />;
  if (path === '/bookings/new') return <BookingCheckoutPage />;
  if (path === '/guest') return <GuestHomePage />;
  if (path === '/admin') return <AdminDashboardPage />;

  return <NotFoundPage />;
}