import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';

/**
 * Dynamic OpenGraph image. Pages pass `?title=` and optional `?subtitle=` /
 * `?kind=` so every route gets a consistent, on-brand social card without a
 * hand-made PNG per page. Uses only built-in fonts (no external fetch).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? siteConfig.name).slice(0, 100);
  const subtitle = (searchParams.get('subtitle') ?? siteConfig.tagline).slice(0, 140);
  const kind = searchParams.get('kind') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#60a5fa' }} />
          <div style={{ color: '#a1a1aa', fontSize: 26, letterSpacing: '-0.01em' }}>
            {siteConfig.name}
          </div>
          {kind && (
            <div
              style={{
                marginLeft: 8,
                color: '#60a5fa',
                fontSize: 22,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              {kind}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#fafafa',
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          <div style={{ color: '#a1a1aa', fontSize: 30, lineHeight: 1.3, maxWidth: 880 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', color: '#52525b', fontSize: 24 }}>
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
