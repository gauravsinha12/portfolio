import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Single accent, driven by a CSS variable so the whole palette can be
        // re-tuned in one place (globals.css). Used sparingly on a grayscale base.
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          fg: 'rgb(var(--accent-fg) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        // A comfortable reading measure (~68ch) for long-form write-ups.
        prose: '68ch',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '68ch',
            '--tw-prose-links': 'rgb(var(--accent))',
            'a': {
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'code': {
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'h2': { scrollMarginTop: '6rem', letterSpacing: '-0.01em' },
            'h3': { scrollMarginTop: '6rem', letterSpacing: '-0.01em' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
