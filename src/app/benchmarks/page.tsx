import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllBenchmarks } from '@/lib/content';
import { PageHeader, Tag } from '@/components/ui';
import { FadeIn } from '@/components/fade-in';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Benchmarks',
  description:
    'Measured experiments with methodology and reproducible repos: what was tested, on what hardware, over how many runs, and what the numbers do not prove.',
  path: '/benchmarks',
  kind: 'Benchmarks',
});

export default function BenchmarksPage() {
  const benchmarks = getAllBenchmarks();

  return (
    <div className="container-page py-16 sm:py-20">
      <PageHeader
        eyebrow="Benchmarks"
        title="Benchmarks"
        intro="Real measurements, not vibes. Each post states the question, the method and hardware, the results as a chart driven by an editable data file, and — just as important — what the numbers do not prove."
      />

      <div className="mt-14 space-y-4">
        {benchmarks.map((benchmark, i) => (
          <FadeIn key={benchmark.slug} delay={i * 60}>
            <Link
              href={`/benchmarks/${benchmark.slug}`}
              className="group block rounded-xl border border-default bg-card p-6 transition-colors hover:border-accent/50"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Question</p>
              <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                {benchmark.frontmatter.question}
              </h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {[benchmark.frontmatter.methodology.tool, benchmark.frontmatter.methodology.runs]
                  .filter((v) => v && !/^FILL/i.test(v.trim()))
                  .map((v) => (
                    <Tag key={v}>{v}</Tag>
                  ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                Read the results
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
