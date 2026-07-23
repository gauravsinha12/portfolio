'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: the resolved theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-default text-muted transition-colors hover:text-[rgb(var(--foreground))] hover:bg-card"
    >
      {mounted && isDark ? (
        <Sun className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      ) : (
        <Moon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      )}
    </button>
  );
}
