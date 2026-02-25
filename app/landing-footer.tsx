'use client'

import { SupravisorLogo } from '@/components/logo'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Standard Logic Co.', href: 'https://standardlogic.ai', external: true },
      { label: 'Contact', href: 'mailto:hello@supravisor.ai', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-2">
            <SupravisorLogo className="h-8 mb-3" />
            <p className="text-sm text-muted mt-4 max-w-xs leading-relaxed">
              Run AI agents without fear. Verifiable identity, enforced policy, cryptographic audit trail.
            </p>
            <p className="text-xs text-muted mt-4">
              A{' '}
              <a
                href="https://standardlogic.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                Standard Logic Co.
              </a>{' '}
              product
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-mono font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) =>
                  'external' in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs text-muted text-center">
            © {new Date().getFullYear()} Standard Logic Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
