import type { Metadata } from 'next';
import { skillGroups } from '@/lib/site';
import { PageHeader, Tag } from '@/components/ui';
import { FadeIn } from '@/components/fade-in';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Skills',
  description:
    'Languages, backend and systems, AI/ML, cloud and DevOps, and databases. Grouped and scannable — no self-assessed proficiency meters.',
  path: '/skills',
  kind: 'Skills',
});

export default function SkillsPage() {
  return (
    <div className="container-page py-16 sm:py-20">
      <PageHeader
        eyebrow="Skills"
        title="Skills"
        intro="Tools I use in production, grouped by area. No percentage bars or star ratings — they are self-assessed and meaningless."
      />

      <div className="mt-12 divide-y divide-[rgb(var(--border))]">
        {skillGroups.map((group, i) => (
          <FadeIn key={group.title} delay={i * 40}>
            <div className="grid gap-4 py-6 sm:grid-cols-[200px_1fr]">
              <h2 className="font-mono text-sm text-muted">{group.title}</h2>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag className="text-[0.8125rem]">{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
