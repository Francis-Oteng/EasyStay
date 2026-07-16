import type { ReactNode } from 'react';
import type { NavLink } from '../../types/navigation';

type AppShellProps = {
  brand: string;
  subtitle: string;
  links: NavLink[];
  children: ReactNode;
};

export function AppShell({ brand, subtitle, links, children }: AppShellProps) {
  return (
    <div className="app-shell app-shell--scaffold">
      <header className="topbar">
        <div>
          <p className="brand">{brand}</p>
          <p className="topbar__subtitle">{subtitle}</p>
        </div>
        <nav className="topbar__nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}