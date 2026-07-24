import type { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'interactive';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: string;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-sm',
  elevated: 'bg-white shadow-lg shadow-black/5',
  bordered: 'bg-white border border-border',
  interactive:
    'bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/30 cursor-pointer transition-all duration-200',
};

export function Card({
  variant = 'default',
  padding = 'p-6',
  className,
  children,
  onClick,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={clsx('rounded-2xl', variantStyles[variant], padding, className)}
      onClick={onClick}
      whileHover={variant === 'interactive' ? { y: -2 } : undefined}
      whileTap={variant === 'interactive' ? { scale: 0.98 } : undefined}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}
