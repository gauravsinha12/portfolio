'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Renders a Mermaid diagram from text. Architecture diagrams live as Mermaid
 * source inside the project MDX files, so they are real, versioned, editable
 * diagrams — not images. Mermaid is dynamically imported, so its bundle only
 * loads on pages that actually contain a diagram.
 */
export function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const id = useId().replace(/:/g, '');
  const ref = useRef(chart);
  ref.current = chart;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, ref.current.trim());
        if (active) setSvg(svg);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : 'Failed to render diagram');
      }
    })();
    return () => {
      active = false;
    };
  }, [resolvedTheme, id]);

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-default bg-card p-4 text-xs text-red-500">
        Diagram error: {error}
      </pre>
    );
  }

  return (
    <figure
      className="my-8 overflow-x-auto rounded-lg border border-default bg-card p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      // eslint-disable-next-line react/no-danger -- output is Mermaid's own sanitized SVG (securityLevel: strict)
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label="Architecture diagram"
    />
  );
}
