import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, PlayCircle } from 'lucide-react';
import { getAllProjects, getProject, type ProjectLinks } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';
import { Tag } from '@/components/ui';
import { Fill } from '@/components/fill';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMetadata({
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    path: `/projects/${project.slug}`,
    kind: 'Project',
    ogSubtitle: project.frontmatter.lead,
  });
}

const LINK_META = {
  live: { label: 'Live demo', icon: ExternalLink },
  github: { label: 'GitHub', icon: Github },
  demo: { label: 'Demo video', icon: PlayCircle },
} as const;

function LinkBar({ links }: { links: ProjectLinks }) {
  const keys = Object.keys(LINK_META) as (keyof typeof LINK_META)[];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {keys.map((key) => {
        // Absent key => not applicable, render nothing.
        if (!(key in links)) return null;
        const value = links[key];
        const { label, icon: Icon } = LINK_META[key];
        // Present-but-empty => an expected link the author still owes.
        if (!value) return <Fill key={key} label={`${label} link`} />;
        return (
          <Link
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-default px-3 py-1.5 text-sm text-muted transition-colors hover:text-[rgb(var(--foreground))] hover:bg-card"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const content = await renderMdx(project.content);

  return (
    <article className="container-page py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[rgb(var(--foreground))]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Projects
      </Link>

      <header className="mt-6 border-b border-default pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.frontmatter.title}
        </h1>
        <p className="mt-3 max-w-prose leading-relaxed text-muted">{project.frontmatter.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.frontmatter.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="mt-5">
          <LinkBar links={project.frontmatter.links} />
        </div>
      </header>

      <div className="prose prose-zinc mt-10 max-w-prose dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-lg prose-a:font-medium prose-strong:text-[rgb(var(--foreground))]">
        {content}
      </div>
    </article>
  );
}
