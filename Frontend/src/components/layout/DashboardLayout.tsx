import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

type UserRole = 'customer' | 'owner';

export interface DashboardLayoutProps {
  role: UserRole;
  activePath: string;
  children: ReactNode;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export function DashboardLayout({
  role,
  activePath,
  children,
  userName,
  userEmail,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-accent/30">
      <Sidebar
        role={role}
        activePath={activePath}
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}