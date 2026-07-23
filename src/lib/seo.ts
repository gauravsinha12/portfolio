import type { Metadata } from 'next';
import { siteConfig } from './site';

/** Build the URL for the dynamic OG image route with the given card text. */
export function ogImageUrl(params: { title?: string; subtitle?: string; kind?: string }): string {
  const search = new URLSearchParams();
  if (params.title) search.set('title', params.title);
  if (params.subtitle) search.set('subtitle', params.subtitle);
  if (params.kind) search.set('kind', params.kind);
  return `/og?${search.toString()}`;
}

/**
 * Assemble per-page metadata (title, description, canonical, OpenGraph, Twitter)
 * from a few fields so every route is consistent.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  kind?: string;
  ogTitle?: string;
  ogSubtitle?: string;
}): Metadata {
  const canonical = opts.path === '/' ? '/' : opts.path;
  const image = ogImageUrl({
    title: opts.ogTitle ?? opts.title,
    subtitle: opts.ogSubtitle ?? opts.description,
    kind: opts.kind,
  });
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: opts.title,
      description: opts.description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}
