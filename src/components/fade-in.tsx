'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for lists of items. */
  delay?: number;
  as?: ElementType;
};

/**
 * The site's only motion: a subtle fade + rise the first time an element scrolls
 * into view. Honors prefers-reduced-motion by rendering fully visible with no
 * transition.
 */
export function FadeIn({ children, className, delay = 0, as: Tag = 'div' }: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If motion is reduced or IntersectionObserver is unavailable, just show it.
    if (reduce || typeof IntersectionObserver === 'undefined' || !node) {
      setVisible(true);
      return;
    }

    // Already on screen at mount (common right after a client-side navigation)?
    // Reveal immediately so content never waits on a scroll event.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);

    // Safety net: never let content stay hidden. If the observer somehow never
    // fires, reveal after a short delay regardless.
    const fallback = window.setTimeout(() => setVisible(true), 700);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
