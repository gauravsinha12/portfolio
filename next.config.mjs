/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Static-first: pages are prerendered at build time. No custom image domains
  // are needed because the site ships its own assets.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Shiki (used by rehype-pretty-code) ships large ESM grammar/theme bundles.
  // Keeping it external to the server bundle keeps builds fast and avoids
  // double-bundling the highlighter.
  experimental: {
    serverComponentsExternalPackages: ['shiki'],
  },
};

export default nextConfig;
