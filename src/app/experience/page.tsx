import type { Metadata } from 'next';
import { education, experience } from '@/lib/site';
import { PageHeader } from '@/components/ui';
import { FadeIn } from '@/components/fade-in';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Experience',
  description:
    'Backend engineering at Accenture for U.S. banking and insurance clients — Spring Boot microservices, Kafka pipelines, zero-downtime Kubernetes deploys, and production LLM services.',
  path: '/experience',
  kind: 'Experience',
});

export default function ExperiencePage() {
  return (
    <div className="container-page py-16 sm:py-20">
      <PageHeader
        eyebrow="Experience"
        title="Experience"
        intro="Client work is under NDA, so client names are kept generic. Every metric below is one I measured and can walk through."
      />

      <div className="mt-14 space-y-16">
        {experience.map((role) => (
          <FadeIn key={role.company}>
            <section aria-label={`${role.title} at ${role.company}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{role.company}</h2>
                <span className="font-mono text-sm text-muted-2">{role.period}</span>
              </div>
              <p className="mt-1 text-muted">{role.title}</p>
              <p className="font-mono text-xs text-muted-2">{role.location}</p>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">{role.summary}</p>

              <div className="mt-8 space-y-10 border-l border-default pl-6">
                {role.clients.map((client) => (
                  <div key={client.name} className="relative">
                    <span
                      className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-[rgb(var(--background))]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-medium">{client.name}</h3>
                      <span className="font-mono text-xs text-muted-2">{client.period}</span>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {client.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="relative max-w-prose pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}

        {/* Education */}
        <FadeIn>
          <section aria-label="Education">
            <h2 className="text-xl font-semibold tracking-tight">Education</h2>
            <div className="mt-6 space-y-6">
              {education.map((ed) => (
                <div key={ed.school} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <div>
                    <h3 className="font-medium">{ed.school}</h3>
                    <p className="text-sm text-muted">{ed.degree}</p>
                    <p className="text-sm text-muted-2">{ed.detail}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-2">{ed.period}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
