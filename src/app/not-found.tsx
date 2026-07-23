import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page doesn&rsquo;t exist.</h1>
      <p className="mt-3 max-w-prose text-muted">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </div>
  );
}
