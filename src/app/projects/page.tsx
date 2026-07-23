import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllProjects } from '@/lib/content';
import { moreProjects } from '@/lib/site';
import { PageHeader, Tag } from '@/components/ui';
import { MoreProjectCard } from '@/components/project-card';
import { FadeIn } from '@/components/fade-in';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Engineering write-ups with the decisions behind each project — what I chose, what I rejected, the tradeoff, and what I would do differently.',
  path: '/projects',
  kind: 'Projects',
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container-page py-16 sm:py-20">
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        intro="Each write-up is structured like an internal design doc: the problem, a real architecture diagram, the engineering decisions and their tradeoffs, and what I would do differently."
      />

      <div className="mt-14 space-y-4">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 60}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block rounded-xl border border-default bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold tracking-tight">{project.frontmatter.title}</h2>
                <span className="inline-flex items-center gap-1 text-sm text-accent">
                  Read
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                {project.frontmatter.lead}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.frontmatter.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* More projects — lighter cards linking straight to GitHub */}
      <section className="mt-20" aria-labelledby="more-projects-heading">
        <div className="flex items-end justify-between gap-4">
          <h2
            id="more-projects-heading"
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            More on GitHub
          </h2>
          <a
            href="https://github.com/gauravsinha12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            @gauravsinha12
          </a>
        </div>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
          A selection of other things I&rsquo;ve built — mostly LLM and ML work, plus a couple of
          systems projects. These link straight to the source.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 40}>
              <MoreProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
