import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * A deliberately loud placeholder for content the author must supply before
 * deploying. It uses a high-contrast amber treatment so an unfilled slot is
 * impossible to miss in any theme. Never ship a page with one of these visible.
 *
 * In MDX:  <Fill>my reasoning about the concurrency model</Fill>
 * The `scripts/check-fills.mjs` script also greps for the literal text "FILL".
 */
export function Fill({ children, label = 'FILL' }: { children?: ReactNode; label?: string }) {
  return (
    <span
      role="note"
      aria-label={`Placeholder to fill in: ${typeof children === 'string' ? children : label}`}
      className="my-1 inline-flex items-start gap-2 rounded-md border-2 border-dashed border-amber-500 bg-amber-500/10 px-3 py-2 align-top font-mono text-sm text-amber-700 dark:text-amber-300"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        <span className="font-semibold uppercase tracking-wide">{label}:</span>{' '}
        {children ?? 'replace this before deploying'}
      </span>
    </span>
  );
}

/**
 * Block-level variant for standalone placeholders (e.g. a missing chart or a
 * whole section of reasoning yet to be written).
 */
export function FillBlock({ children, label = 'FILL' }: { children?: ReactNode; label?: string }) {
  return (
    <div
      role="note"
      className="my-6 flex items-start gap-3 rounded-lg border-2 border-dashed border-amber-500 bg-amber-500/10 px-4 py-4 font-mono text-sm text-amber-700 dark:text-amber-300"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold uppercase tracking-wide">{label} — replace before deploying</p>
        {children && <div className="mt-1 font-sans text-amber-800 dark:text-amber-200">{children}</div>}
      </div>
    </div>
  );
}
