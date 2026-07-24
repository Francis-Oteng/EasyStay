import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { House, Menu, X, ChevronDown, LayoutDashboard, User, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Become a Host', href: '/become-host' },
];

export interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

export function Navbar({
  isLoggedIn = false,
  userName = 'User',
  userAvatar,
  userRole,
  onLogin,
  onSignup,
  onLogout,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <House className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-secondary font-heading">StayEasy</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-accent'
                    : 'text-text-muted hover:text-text hover:bg-accent/50',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-accent transition-colors"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-text">{userName}</span>
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-1"
                    >
                      <Link
                        to={userRole === 'OWNER' ? '/owner/dashboard' : '/dashboard'}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout?.();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-text-muted hover:text-text hover:bg-accent transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-bold text-secondary font-heading">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'text-primary bg-accent'
                        : 'text-text-muted hover:text-text hover:bg-accent/50',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-border flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to={userRole === 'OWNER' ? '/owner/dashboard' : '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-text hover:bg-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onLogout?.();
                      }}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/5 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onLogin?.();
                      }}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-text border border-border hover:bg-accent transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onSignup?.();
                      }}
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}