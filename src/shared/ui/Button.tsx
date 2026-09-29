import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-primary-contrast hover:brightness-110',
  secondary: 'border border-line bg-surface text-ink hover:bg-bg',
  ghost: 'bg-transparent text-ink hover:bg-bg',
  danger: 'bg-danger text-danger-contrast hover:brightness-110',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold',
        'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    />
  );
}
