'use client';

import { useRef, useState, type ComponentProps } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * Overrides the `<pre>` element produced by rehype-pretty-code. The raw source
 * (with real newlines) is threaded through as the `raw` prop by the paired
 * rehype plugins in mdx.tsx, so copy-to-clipboard yields exactly what was typed
 * in the fenced block — not the DOM's collapsed textContent.
 */
export function Pre({ raw, children, ...props }: ComponentProps<'pre'> & { raw?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = raw ?? preRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-default bg-[rgb(var(--background))] text-muted opacity-0 transition-opacity hover:text-[rgb(var(--foreground))] focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
