import Link from 'next/link';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { siteConfig, socials } from '@/lib/site';

const links = [
  { href: socials.email, label: 'Email', icon: Mail, external: false },
  { href: socials.github, label: 'GitHub', icon: Github, external: true },
  { href: socials.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
  { href: siteConfig.resumePath, label: 'Résumé', icon: FileText, external: true },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-default">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted-2">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[rgb(var(--foreground))]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
