import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        {children || <Outlet />}
      </main>
    </div>
  );
}