import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import type { Project } from '@/lib/content';
import type { MoreProject } from '@/lib/site';
import { Tag } from './ui';

/**
 * A project card that leads with one concrete technical fact (`frontmatter.lead`)
 * rather than a tagline. The whole card is a link to the write-up.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col rounded-xl border border-default bg-card p-5 transition-colors hover:border-accent/50"
    >
      <h3 className="text-base font-semibold tracking-tight">{frontmatter.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{frontmatter.lead}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {frontmatter.stack.slice(0, 4).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read the write-up
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * A lighter card for a GitHub project that doesn't have a full write-up. The
 * whole card links to the repo.
 */
export function MoreProjectCard({ project }: { project: MoreProject }) {
  return (
    <Link
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-default bg-card p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-semibold tracking-tight">{project.name}</h3>
        <Github
          className="h-4 w-4 shrink-0 text-muted-2 transition-colors group-hover:text-accent"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </Link>
  );
}
