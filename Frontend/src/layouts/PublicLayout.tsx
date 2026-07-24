import { type ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

interface PublicLayoutProps {
  children?: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isAuthenticated}
        userName={user?.fullName}
        userAvatar={user?.avatar}
        userRole={user?.role}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/register')}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />
      <main className="flex-1 pt-16">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}