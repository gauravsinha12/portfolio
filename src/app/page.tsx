import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, MapPin } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/content';
import { currently, siteConfig } from '@/lib/site';
import { ButtonLink } from '@/components/ui';
import { ProjectCard } from '@/components/project-card';
import { FadeIn } from '@/components/fade-in';

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="container-page">
      {/* Hero */}
      <section className="max-w-3xl pt-20 sm:pt-28">
        <FadeIn>
          <p className="flex items-center gap-2 font-mono text-sm text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {siteConfig.location} · Accenture, Advance App Engineering Analyst
          </p>
        </FadeIn>
        <FadeIn delay={60}>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-4 text-xl leading-relaxed text-muted sm:text-2xl">
            {siteConfig.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={180}>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            3.5+ years building distributed systems in Java, Go, and Python for top U.S. banking and
            insurance clients — Kafka event pipelines, microservices, zero-downtime Kubernetes
            deploys — alongside production LLM work: RAG pipelines, LLM automation, and QLoRA
            fine-tuning.
          </p>
        </FadeIn>
        <FadeIn delay={240}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read the engineering write-ups
            </ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary" external>
              <FileText className="h-4 w-4" aria-hidden="true" />
              Résumé
            </ButtonLink>
          </div>
        </FadeIn>
      </section>

      {/* Featured projects */}
      <section className="mt-24" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-sm font-mono uppercase tracking-widest text-muted">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline underline-offset-4"
          >
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section className="mt-24" aria-labelledby="currently-heading">
        <FadeIn>
          <div className="rounded-xl border border-default bg-card p-6 sm:p-8">
            <h2
              id="currently-heading"
              className="font-mono text-xs uppercase tracking-widest text-accent"
            >
              Currently
            </h2>
            <dl className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium">Building</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{currently.building}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Studying</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{currently.studying}</dd>
              </div>
            </dl>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
