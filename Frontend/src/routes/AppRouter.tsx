import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AppStoreProvider } from '../store/appStore';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';

import {
  HomePage,
  PropertiesPage,
  PropertyDetailPage,
  AboutPage,
  ContactPage,
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
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

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
                  <Route path="dashboard" element={<OwnerDashboard />} />
                  <Route path="properties" element={<MyPropertiesPage />} />
                  <Route path="add-property" element={<AddPropertyPage />} />
                  <Route path="edit-property/:id" element={<EditPropertyPage />} />
                  <Route path="bookings" element={<OwnerBookingsPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="revenue" element={<RevenuePage />} />
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