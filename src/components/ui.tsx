import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/** A mono metadata / tech tag. No proficiency meaning — just a label. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-default bg-card px-2 py-0.5 font-mono text-xs text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary';
  external?: boolean;
};

/** A CTA rendered as a link. Primary uses the accent; secondary is outlined. */
export function ButtonLink({
  variant = 'primary',
  external,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary'
          ? 'bg-accent text-[rgb(var(--accent-fg))] hover:opacity-90'
          : 'border border-default text-[rgb(var(--foreground))] hover:bg-card',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/** A labelled inline link that renders an out-arrow for external destinations. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 text-sm text-accent hover:underline underline-offset-4',
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

/** Section heading with a consistent eyebrow + title rhythm. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro && <p className="mt-4 text-muted leading-relaxed">{intro}</p>}
    </header>
  );
}
