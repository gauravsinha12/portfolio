/**
 * Filesystem-backed content layer. All prose lives as MDX under /content; this
 * module reads those files at build time (Server Components only) and returns
 * typed frontmatter + raw MDX bodies. Charts read companion `.data.json` files.
 */
import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const BENCHMARKS_DIR = path.join(CONTENT_DIR, 'benchmarks');

export type ProjectLinks = {
  live?: string;
  github?: string;
  demo?: string;
};

export type ProjectFrontmatter = {
  title: string;
  /** One-line summary used for cards, listings, and meta descriptions. */
  summary: string;
  /** The single concrete technical fact a featured card leads with. */
  lead: string;
  stack: string[];
  links: ProjectLinks;
  featured?: boolean;
  order?: number;
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
};

export type BenchmarkMethodology = {
  tool: string;
  hardware: string;
  dataset: string;
  runs: string;
};

export type BenchmarkFrontmatter = {
  title: string;
  /** The question the experiment tests, phrased as a question. */
  question: string;
  summary: string;
  methodology: BenchmarkMethodology;
  /** Companion data file basename in /content/benchmarks, e.g. "foo.data.json". */
  data?: string;
  /** Link to the reproducible repo. Empty string renders a [FILL] slot. */
  repo?: string;
  order?: number;
};

export type Benchmark = {
  slug: string;
  frontmatter: BenchmarkFrontmatter;
  content: string;
};

function readMdxDir(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      raw: fs.readFileSync(path.join(dir, file), 'utf8'),
    }));
}

function bySortOrder<T extends { order?: number; title: string }>(a: T, b: T) {
  const ao = a.order ?? 999;
  const bo = b.order ?? 999;
  if (ao !== bo) return ao - bo;
  return a.title.localeCompare(b.title);
}

/* ------------------------------- projects -------------------------------- */

export function getAllProjects(): Project[] {
  return readMdxDir(PROJECTS_DIR)
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as ProjectFrontmatter, content };
    })
    .sort((a, b) => bySortOrder(a.frontmatter, b.frontmatter));
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.frontmatter.featured);
  return (featured.length ? featured : projects).slice(0, 3);
}

/* ------------------------------ benchmarks ------------------------------- */

export function getAllBenchmarks(): Benchmark[] {
  return readMdxDir(BENCHMARKS_DIR)
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as BenchmarkFrontmatter, content };
    })
    .sort((a, b) => bySortOrder(a.frontmatter, b.frontmatter));
}

export function getBenchmarkSlugs(): string[] {
  return getAllBenchmarks().map((b) => b.slug);
}

export function getBenchmark(slug: string): Benchmark | null {
  return getAllBenchmarks().find((b) => b.slug === slug) ?? null;
}

/**
 * Loads a benchmark's companion JSON data file. Returns `null` when the file is
 * absent so chart components can render a [FILL] state instead of fabricating
 * numbers.
 */
export function getBenchmarkData<T = unknown>(fileName: string): T | null {
  const file = path.join(BENCHMARKS_DIR, fileName);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return null;
  }
}
