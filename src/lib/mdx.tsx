import 'server-only';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import { Pre } from '@/components/code-block';
import { Mermaid } from '@/components/mermaid';
import { Fill, FillBlock } from '@/components/fill';

/* ------------------------------------------------------------------ plugins */
// Thread the original fenced-code source through to the client <Pre> so the
// copy button yields real newlines instead of the DOM's collapsed textContent.
type AnyNode = {
  type?: string;
  tagName?: string;
  value?: string;
  raw?: string;
  properties?: Record<string, unknown>;
  children?: AnyNode[];
};

function walk(node: AnyNode, fn: (n: AnyNode) => void) {
  fn(node);
  node.children?.forEach((child) => walk(child, fn));
}

// Turn ```mermaid fenced blocks into a <mermaid-diagram chart="..."> element
// before rehype-pretty-code runs. The diagram source rides as a hast property
// (the same path Pre's `raw` uses), which serializes to the client Mermaid
// component reliably — unlike an MDX JSX expression attribute, which
// next-mdx-remote's RSC compiler drops. Runs first so pretty-code never tries
// to syntax-highlight "mermaid".
function rehypeMermaid() {
  return (tree: AnyNode) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'pre') return;
      const code = node.children?.[0];
      if (code?.tagName !== 'code') return;
      const cls = code.properties?.className;
      const classes = Array.isArray(cls) ? cls : typeof cls === 'string' ? cls.split(' ') : [];
      if (!classes.includes('language-mermaid')) return;
      const text = code.children?.[0]?.value;
      if (typeof text !== 'string') return;
      node.tagName = 'mermaid-diagram';
      node.properties = { chart: text };
      node.children = [];
    });
  };
}

function rehypePreRaw() {
  return (tree: AnyNode) => {
    walk(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        const code = node.children?.[0];
        if (code?.tagName !== 'code') return;
        const text = code.children?.[0]?.value;
        if (typeof text === 'string') node.raw = text;
      }
    });
  };
}

function rehypePostRaw() {
  return (tree: AnyNode) => {
    walk(tree, (node) => {
      // Case 1: rehype-pretty-code wrapped the pre in a figure and carried `raw`.
      if (
        node.type === 'element' &&
        node.tagName === 'figure' &&
        node.properties &&
        'data-rehype-pretty-code-figure' in node.properties
      ) {
        node.children?.forEach((child) => {
          if (child.tagName === 'pre' && node.raw) {
            child.properties = { ...child.properties, raw: node.raw };
          }
        });
      }
      // Case 2: the pre element kept its own `raw` reference.
      if (node.type === 'element' && node.tagName === 'pre' && node.raw) {
        node.properties = { ...node.properties, raw: node.raw };
      }
    });
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

/* --------------------------------------------------------------- components */
function MdxLink({ href = '', children }: { href?: string; children?: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

function Callout({ children }: { children?: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border-l-2 border-accent bg-card px-4 py-3 text-sm text-muted">
      {children}
    </aside>
  );
}

/** Base components available inside every MDX document. */
export const baseMdxComponents = {
  a: MdxLink,
  pre: Pre,
  // Diagrams are authored as ```mermaid fences and rewritten to this element by
  // rehypeMermaid; the `chart` hast property arrives as a prop.
  'mermaid-diagram': Mermaid,
  Fill,
  FillBlock,
  Callout,
};

/* ------------------------------------------------------------------ render */
export async function renderMdx(source: string, extraComponents: Record<string, unknown> = {}) {
  const { content } = await compileMDX({
    source,
    components: { ...baseMdxComponents, ...extraComponents },
    options: {
      parseFrontmatter: false, // frontmatter is stripped by gray-matter upstream
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeMermaid,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'heading-anchor' } }],
          rehypePreRaw,
          [rehypePrettyCode, prettyCodeOptions],
          rehypePostRaw,
        ],
      },
    },
  });
  return content;
}
