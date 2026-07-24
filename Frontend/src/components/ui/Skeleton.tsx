import clsx from 'clsx';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-md',
  circular: 'rounded-full',
  rectangular: 'rounded-xl',
};

function SkeletonItem({ variant, width, height, className }: Omit<SkeletonProps, 'count'>) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-border/70',
        variantStyles[variant || 'text'],
        className,
      )}
      style={{
        width: width ?? (variant === 'circular' ? height : '100%'),
        height: height ?? (variant === 'text' ? 16 : undefined),
      }}
    />
  );
}

export function Skeleton({ variant = 'text', width, height, className, count = 1 }: SkeletonProps) {
  if (count > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonItem key={i} variant={variant} width={width} height={height} className={className} />
        ))}
      </div>
    );
  }

  return <SkeletonItem variant={variant} width={width} height={height} className={className} />;
}