'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

export type ChartSeries = { key: string; label: string };

export type ChartConfig = {
  title?: string;
  type?: 'bar' | 'line';
  unit?: string;
  xKey: string;
  series: ChartSeries[];
  data: Record<string, string | number | null>[];
  note?: string;
};

// A restrained categorical palette. Charts legitimately need multiple hues;
// the first is the site accent so single-series charts stay on-brand.
const PALETTE = ['#3b82f6', '#94a3b8', '#f59e0b', '#10b981'];
const CHART_HEIGHT = 256;

function isUnfilled(config?: ChartConfig): boolean {
  if (!config || !Array.isArray(config.data) || config.data.length === 0) return true;
  // Unfilled if every series value across every row is null/undefined.
  return config.series.every((s) =>
    config.data.every((row) => row[s.key] === null || row[s.key] === undefined),
  );
}

/**
 * Measure a container's width with a ResizeObserver. We render the chart at an
 * explicit pixel width rather than using Recharts' ResponsiveContainer, whose
 * initial-measure step is unreliable and can leave the chart blank.
 */
function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  return { ref, width };
}

/**
 * Renders a benchmark chart from a resolved config object. The config comes from
 * a `.data.json` file next to the MDX post, so numbers are edited in JSON and
 * never in component code. When the data is still all-null it renders a loud
 * placeholder instead of an empty or fabricated chart.
 */
export function BenchmarkChart({ config, id }: { config?: ChartConfig; id?: string }) {
  const { resolvedTheme } = useTheme();
  const { ref, width } = useContainerWidth();
  const dark = resolvedTheme === 'dark';
  const axis = dark ? '#a1a1aa' : '#52525b';
  const grid = dark ? '#27272a' : '#e4e4e7';
  const surface = dark ? '#18181b' : '#ffffff';

  if (isUnfilled(config)) {
    return (
      <div className="my-6 flex items-center gap-3 rounded-lg border-2 border-dashed border-amber-500 bg-amber-500/10 px-4 py-6 font-mono text-sm text-amber-700 dark:text-amber-300">
        <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>
          FILL — no measured data yet for chart{' '}
          <code className="font-semibold">{id ?? config?.title ?? 'unknown'}</code>. Add numbers to
          the benchmark&rsquo;s <code>.data.json</code> file.
        </span>
      </div>
    );
  }

  const cfg = config as ChartConfig;
  const ChartEl = cfg.type === 'line' ? LineChart : BarChart;

  return (
    <figure className="my-8">
      {cfg.title && (
        <figcaption className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
          {cfg.title}
          {cfg.unit ? ` (${cfg.unit})` : ''}
        </figcaption>
      )}
      <div className="rounded-lg border border-default bg-card p-4">
        <div ref={ref} className="w-full" style={{ height: CHART_HEIGHT }}>
          {width > 0 && (
            <ChartEl
              width={width}
              height={CHART_HEIGHT}
              data={cfg.data}
              margin={{ top: 8, right: 12, bottom: 4, left: -8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
              <XAxis
                dataKey={cfg.xKey}
                stroke={axis}
                tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}
                tickLine={false}
                axisLine={{ stroke: grid }}
              />
              <YAxis
                stroke={axis}
                tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip
                cursor={{ fill: dark ? '#ffffff0d' : '#0000000a' }}
                contentStyle={{
                  background: surface,
                  border: `1px solid ${grid}`,
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                }}
              />
              {cfg.series.length > 1 && (
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
              )}
              {cfg.series.map((s, i) =>
                cfg.type === 'line' ? (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={PALETTE[i % PALETTE.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls
                  />
                ) : (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    name={s.label}
                    fill={PALETTE[i % PALETTE.length]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={64}
                  />
                ),
              )}
            </ChartEl>
          )}
        </div>
      </div>
      {cfg.note && <figcaption className="mt-3 text-sm text-muted">{cfg.note}</figcaption>}
    </figure>
  );
}
