import type { ReactNode } from 'react';

interface PropertyGridProps {
  children: ReactNode;
  className?: string;
}

export function PropertyGrid({ children, className }: PropertyGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ''}`}>
      {children}
    </div>
  );
}