import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GitBranch } from 'lucide-react';
import { getAllBenchmarks, getBenchmark, getBenchmarkData } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';
import { BenchmarkChart, type ChartConfig } from '@/components/benchmark-chart';
import { Fill } from '@/components/fill';
import { pageMetadata } from '@/lib/seo';

type BenchmarkDataFile = { charts?: Record<string, ChartConfig> };

export function generateStaticParams() {
  return getAllBenchmarks().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const benchmark = getBenchmark(params.slug);
  if (!benchmark) return {};
  return pageMetadata({
    title: benchmark.frontmatter.title,
    description: benchmark.frontmatter.summary,
    path: `/benchmarks/${benchmark.slug}`,
    kind: 'Benchmark',
    ogTitle: benchmark.frontmatter.question,
    ogSubtitle: benchmark.frontmatter.summary,
  });
}

function isUnset(value?: string) {
  return !value || /^FILL/i.test(value.trim());
}

function MethodRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-default py-3 last:border-b-0 sm:flex-row sm:gap-4">
      <dt className="w-32 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-2">
        {label}
      </dt>
      <dd className="text-sm text-muted">
        {isUnset(value) ? <Fill label={`${label}`} /> : value}
      </dd>
    </div>
  );
}

export default async function BenchmarkPage({ params }: { params: { slug: string } }) {
  const benchmark = getBenchmark(params.slug);
  if (!benchmark) notFound();

  const { frontmatter } = benchmark;
  const dataFile = frontmatter.data ? getBenchmarkData<BenchmarkDataFile>(frontmatter.data) : null;

  // Bind the chart component to this benchmark's data file so MDX authors just
  // reference a chart by id: <BenchmarkChart id="latency" />.
  const components = {
    BenchmarkChart: ({ id }: { id: string }) => (
      <BenchmarkChart id={id} config={dataFile?.charts?.[id]} />
    ),
  };

  const content = await renderMdx(benchmark.content, components);

  return (
    <article className="container-page py-16 sm:py-20">
      <Link
        href="/benchmarks"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[rgb(var(--foreground))]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Benchmarks
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Question</p>
        <h1 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {frontmatter.question}
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed text-muted">{frontmatter.summary}</p>
      </header>

      {/* Methodology */}
      <section className="mt-10 rounded-xl border border-default bg-card p-6" aria-label="Methodology">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Methodology</h2>
        <dl className="mt-4">
          <MethodRow label="Tool" value={frontmatter.methodology.tool} />
          <MethodRow label="Hardware" value={frontmatter.methodology.hardware} />
          <MethodRow label="Dataset" value={frontmatter.methodology.dataset} />
          <MethodRow label="Runs" value={frontmatter.methodology.runs} />
        </dl>
        <div className="mt-5">
          {frontmatter.repo ? (
            <Link
              href={frontmatter.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4"
            >
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              Reproducible repo
            </Link>
          ) : (
            <Fill label="Reproducible repo link" />
          )}
        </div>
      </section>

      <div className="prose prose-zinc mt-12 max-w-prose dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-lg prose-a:font-medium prose-strong:text-[rgb(var(--foreground))]">
        {content}
      </div>
    </article>
  );
}
