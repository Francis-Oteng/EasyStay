import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Heart,
  Bell,
  Search,
  BookOpen,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import clsx from 'clsx';

type UserRole = 'customer' | 'owner';

export interface SidebarProps {
  role: UserRole;
  activePath: string;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

interface SidebarLink {
  label: string;
  href: string;
  icon: typeof User;
}

const customerLinks: SidebarLink[] = [
  { label: 'Browse Properties', href: '/properties', icon: Search },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: BookOpen },
  { label: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const ownerLinks: SidebarLink[] = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
  { label: 'My Properties', href: '/owner/properties', icon: Building2 },
  { label: 'Add Property', href: '/owner/properties/add', icon: PlusCircle },
  { label: 'Bookings', href: '/owner/bookings', icon: BookOpen },
  { label: 'Calendar', href: '/owner/calendar', icon: Calendar },
  { label: 'Revenue', href: '/owner/revenue', icon: TrendingUp },
  { label: 'Messages', href: '/owner/messages', icon: MessageSquare },
  { label: 'Profile', href: '/owner/profile', icon: User },
  { label: 'Settings', href: '/owner/settings', icon: Settings },
];

export function Sidebar({
  role,
  activePath,
  userName = 'User',
  userEmail = 'user@example.com',
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = role === 'customer' ? customerLinks : ownerLinks;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text truncate">{userName}</p>
              <p className="text-xs text-text-muted truncate">{userEmail}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              activePath === link.href
                ? 'text-primary bg-accent'
                : 'text-text-muted hover:text-text hover:bg-accent/50',
              collapsed && 'justify-center px-2',
            )}
            title={collapsed ? link.label : undefined}
          >
            <link.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border/50">
        <button
          onClick={onLogout}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-error/80 hover:text-error hover:bg-error/5 transition-colors',
            collapsed && 'justify-center px-2',
          )}
          title="Logout"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <div className="p-3 border-t border-border/50 hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-xl text-text-muted hover:text-text hover:bg-accent/50 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={clsx('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-30 w-12 h-12 rounded-xl bg-primary text-white shadow-lg flex items-center justify-center"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={clsx(
          'hidden lg:flex flex-col bg-white border-r border-border/50 h-screen sticky top-0 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-bold text-secondary font-heading">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-accent transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {sidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}