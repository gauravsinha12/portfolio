#!/usr/bin/env node
/**
 * Scans /content for unfilled placeholders before deploy.
 *
 *   npm run check:fills
 *
 * Every placeholder is already visually loud in the UI; this gives you the same
 * checklist from the terminal and exits non-zero when any remain, so you can
 * gate CI on it. It flags four things:
 *
 *   • reasoning slots   — <Fill> / <FillBlock> components in project/benchmark MDX
 *   • markers           — a literal [FILL ...] or bare uppercase FILL in text
 *   • empty datapoints  — `null` chart values in a .data.json file
 *   • empty fields      — required frontmatter keys left as "" (links, repo, methodology)
 */
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');

const EMPTY_FIELD_KEYS = ['github', 'demo', 'live', 'repo', 'tool', 'hardware', 'dataset', 'runs'];

const CHECKS = [
  { label: 'reasoning slot', test: (line) => /<Fill(Block)?\b/.test(line) },
  { label: 'marker', test: (line) => /\[FILL\b/i.test(line) || /\bFILL\b/.test(line) },
  { label: 'empty datapoint', test: (line, file) => file.endsWith('.json') && /:\s*null\b/.test(line) },
  {
    label: 'empty field',
    test: (line, file) =>
      /\.mdx$/.test(file) &&
      EMPTY_FIELD_KEYS.some((k) => new RegExp(`^\\s*${k}:\\s*("")?\\s*$`).test(line)),
  },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const full = join(dir, e.name);
      return e.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return nested.flat();
}

async function main() {
  let files;
  try {
    files = await walk(contentDir);
  } catch {
    console.error('No /content directory found.');
    process.exit(1);
  }

  const hits = [];
  for (const file of files) {
    if (!/\.(mdx?|json)$/.test(file)) continue;
    const rel = relative(root, file);
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      for (const check of CHECKS) {
        if (check.test(line, file)) {
          hits.push({ file: rel, line: i + 1, label: check.label, text: line.trim() });
          break;
        }
      }
    });
  }

  if (hits.length === 0) {
    console.log('✓ No placeholders remain in /content.');
    process.exit(0);
  }

  const byLabel = hits.reduce((acc, h) => ({ ...acc, [h.label]: (acc[h.label] ?? 0) + 1 }), {});
  console.log(`✗ ${hits.length} unfilled placeholder(s) remain:\n`);
  for (const hit of hits) {
    const snippet = hit.text.length > 88 ? `${hit.text.slice(0, 88)}…` : hit.text;
    console.log(`  [${hit.label}] ${hit.file}:${hit.line}`);
    console.log(`    ${snippet}\n`);
  }
  console.log(
    'Summary: ' +
      Object.entries(byLabel)
        .map(([k, v]) => `${v} ${k}${v === 1 ? '' : 's'}`)
        .join(', '),
  );
  console.log('Replace every slot above with a value you can defend before deploying.');
  process.exit(1);
}

main();
