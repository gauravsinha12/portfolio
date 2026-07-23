# Gaurav Sinha — Portfolio

Personal site for a backend engineer who ships GenAI features in production. The
differentiator is depth, not breadth: every project is written up like an
internal design doc (what I chose, what I rejected, the tradeoff, what I'd do
differently), and a dedicated **Benchmarks** section publishes measured data
with methodology and a link to a reproducible repo.

Prose lives in MDX under `/content` so it can be edited without touching
components. The site is static-first and deploys to Vercel with no backend.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with `@tailwindcss/typography`
- **MDX** via `next-mdx-remote/rsc` — content in `/content`
- **Shiki** syntax highlighting (`rehype-pretty-code`) + copy-to-clipboard
- **Recharts** for benchmark charts, driven by editable JSON data files
- **Mermaid** for architecture diagrams authored as text in MDX
- **next-themes** — dark mode default, light toggle
- Dynamic **OpenGraph** images (`next/og`), `sitemap.xml`, `robots.txt`

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (statically prerenders every page)
npm run start        # serve the production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit
npm run check:fills  # list every unfilled [FILL] placeholder in /content
```

## Project structure

```
content/
  projects/                 # one .mdx per project write-up
    codearena.mdx
    setu.mdx
    debateable-ai.mdx
  benchmarks/               # one .mdx per benchmark + its .data.json
    websocket-capacity.mdx
    websocket-capacity.data.json
    corrective-vs-vanilla-rag.mdx
    corrective-vs-vanilla-rag.data.json
src/
  app/                      # routes (home, projects, benchmarks, experience, skills)
    og/route.tsx            # dynamic OpenGraph image
    sitemap.ts, robots.ts
  components/               # header, footer, cards, charts, code block, Fill, etc.
  lib/
    site.ts                 # identity, nav, experience, education, skills  ← edit me
    content.ts              # loads MDX + frontmatter + benchmark data
    mdx.tsx                 # MDX render pipeline + component map
    seo.ts                  # per-page metadata + OG helper
scripts/
  check-fills.mjs           # pre-deploy placeholder scan
public/
  resume.pdf                # ← you add this file
```

## Editing content

### Identity, experience, skills

All non-prose facts live in [`src/lib/site.ts`](src/lib/site.ts): name, tagline,
location, social links, the `experience` array (roles → clients → bullets),
`education`, and `skillGroups`. Edit that one file — the pages read from it.

### Add a project write-up

1. Create `content/projects/<slug>.mdx`. The URL becomes `/projects/<slug>`.
2. Frontmatter:

   ```yaml
   ---
   title: My Project
   summary: One sentence for cards, listings, and the meta description.
   lead: The single concrete technical fact a featured card leads with.
   stack: [Go, PostgreSQL, Redis]
   links:
     live: https://example.com      # optional
     github: https://github.com/... # use "" to render a loud "fill me" badge
     demo: https://youtu.be/...      # omit the key entirely if not applicable
   featured: true                    # show on the home page (top 3)
   order: 1                          # sort order
   ---
   ```

3. Write the body. The template is: **The problem → Architecture (Mermaid) →
   Engineering decisions → What I'd do differently.**

   - Architecture diagram — author it as Mermaid text:

     ```mdx
     <Mermaid chart={`
     flowchart LR
       A["Client"] --> B["Server"]
       B --> C[("Database")]
     `} />
     ```

   - Placeholder you must fill before deploying — renders a loud amber slot:

     ```mdx
     <Fill>State the choice I made and the tradeoff I can defend.</Fill>
     ```

   - Code blocks get Shiki highlighting + a copy button automatically. Add a
     title or line highlights with rehype-pretty-code meta:

     ````mdx
     ```go title="conn.go" {3-5}
     func run() { /* ... */ }
     ```
     ````

Link presence is meaningful: a **present-but-empty** link (`github: ""`) renders
a loud "fill me" badge; an **omitted** key renders nothing (not applicable).

### Add a benchmark post

1. Create `content/benchmarks/<slug>.mdx` and a sibling
   `content/benchmarks/<slug>.data.json`.
2. Frontmatter:

   ```yaml
   ---
   title: Short title
   question: The question being tested, phrased as a question?
   summary: One sentence for the card and meta description.
   methodology:
     tool: k6           # leave "" to render a loud fill slot
     hardware: ""
     dataset: ""
     runs: ""
   data: <slug>.data.json
   repo: ""             # reproducible repo link ("" = fill slot)
   order: 1
   ---
   ```

3. In the body, drop a chart by id — the component reads the JSON, so you never
   touch component code:

   ```mdx
   <BenchmarkChart id="latency" />
   ```

4. Define that chart in the `.data.json` file:

   ```json
   {
     "charts": {
       "latency": {
         "title": "End-to-end latency by percentile",
         "type": "bar",              // "bar" or "line"
         "unit": "ms",
         "xKey": "percentile",
         "series": [{ "key": "ms", "label": "Latency" }],
         "data": [
           { "percentile": "p50", "ms": 12 },
           { "percentile": "p95", "ms": 34 },
           { "percentile": "p99", "ms": 51 }
         ]
       }
     }
   }
   ```

   While every value in a chart is `null`, the site renders a loud placeholder
   instead of an empty or fabricated chart. Multiple series (e.g. comparing two
   pipelines) just means multiple entries in `series` and multiple keys per row.

### The `[FILL]` system

Nothing on this site should ship with an invented number or borrowed reasoning.
Placeholders are deliberately loud in the UI **and** greppable:

```bash
npm run check:fills
```

It reports four kinds of gaps and exits non-zero while any remain:
**reasoning slots** (`<Fill>`), **markers** (literal `[FILL]`), **empty
datapoints** (`null` chart values), and **empty fields** (frontmatter links /
methodology left as `""`). Wire it into CI if you want a hard gate.

## Theming

Colors are CSS variables in [`src/app/globals.css`](src/app/globals.css). To
retune the single accent, change `--accent` in both `:root` (light) and `.dark`.
Fonts are Inter (sans) and JetBrains Mono (mono), self-hosted via `next/font`.

## The résumé file

The résumé button links to `/resume.pdf`. Drop your PDF at `public/resume.pdf`;
it is intentionally not committed.

## Deploy to Vercel

1. Set the production origin in [`src/lib/site.ts`](src/lib/site.ts) →
   `siteConfig.url`. It feeds canonical URLs, OpenGraph tags, the sitemap, and
   robots.
2. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
   Framework preset **Next.js** is detected automatically — no environment
   variables required.
3. Before shipping, run `npm run check:fills` and replace every placeholder with
   a real value you can defend.

Deploys are static; content changes are a git push.
