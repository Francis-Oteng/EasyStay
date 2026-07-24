import { type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../hooks/useAuth';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role === 'OWNER' ? 'owner' : 'customer';

  return (
    <div className="flex min-h-screen">
      <Sidebar
        role={role}
        activePath={pathname}
        userName={user?.fullName}
        userEmail={user?.email}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />
      <main className="flex-1 p-6 bg-gray-50">
        {children || <Outlet />}
      </main>
    </div>
  );
}