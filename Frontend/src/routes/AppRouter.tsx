import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AppStoreProvider } from '../store/appStore';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

import {
  HomePage,
  PropertiesPage,
  PropertyDetailPage,
  AboutPage,
  ContactPage,
  RoomsPage,
  BookingCheckoutPage,
  BecomeHostPage,
  InfoPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  CustomerDashboard,
  MyBookingsPage,
  WishlistPage,
  ProfilePage,
  NotificationsPage,
  OwnerDashboard,
  MyPropertiesPage,
  AddPropertyPage,
  EditPropertyPage,
  OwnerBookingsPage,
  CalendarPage,
  RevenuePage,
  OwnerMessagesPage,
  NotFoundPage,
} from '../pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppRouter() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppStoreProvider>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<RoomsPage />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:id" element={<PropertyDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/become-host" element={<BecomeHostPage />} />
                  <Route path="/checkout" element={<BookingCheckoutPage />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  <Route path="/faq" element={<InfoPage />} />
                  <Route path="/terms" element={<InfoPage />} />
                  <Route path="/privacy" element={<InfoPage />} />
                  <Route path="/help" element={<InfoPage />} />
                  <Route path="/cookies" element={<InfoPage />} />
                </Route>

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<CustomerDashboard />} />
                </Route>

                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<MyBookingsPage />} />
                </Route>

                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<WishlistPage />} />
                </Route>

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ProfilePage />} />
                </Route>

                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<NotificationsPage />} />
                </Route>

                <Route
                  path="/owner"
                  element={
                    <ProtectedRoute requiredRole="OWNER">
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/owner/dashboard" replace />} />
                  <Route path="dashboard" element={<OwnerDashboard />} />
                  <Route path="properties" element={<MyPropertiesPage />} />
                  <Route path="add-property" element={<AddPropertyPage />} />
                  <Route path="edit-property/:id" element={<EditPropertyPage />} />
                  <Route path="bookings" element={<OwnerBookingsPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="revenue" element={<RevenuePage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<ProfilePage />} />
                  <Route path="messages" element={<OwnerMessagesPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AppStoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}