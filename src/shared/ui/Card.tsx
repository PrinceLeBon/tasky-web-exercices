import { useId, type ReactNode, type Ref } from 'react';
import { cn } from '../lib/cn';

type CardProps = {
  title: string;
  titleRef?: Ref<HTMLHeadingElement>;
  className?: string;
  children: ReactNode;
};

export function Card({ title, titleRef, className, children }: CardProps) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className={cn('rounded-xl border border-line bg-surface p-6 shadow-sm', className)}
    >
      <h2 id={titleId} ref={titleRef} tabIndex={-1} className="mb-4 text-lg font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}
