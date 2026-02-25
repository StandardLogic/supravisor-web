'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { SupravisorLogo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'

// ── Navigation structure (mirrored from mint.json) ───────────────

const NAV_SECTIONS = [
  {
    group: 'Getting Started',
    pages: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Quickstart', href: '/docs/quickstart' },
      { label: 'Gate Operator Quickstart', href: '/docs/quickstart-gate' },
      { label: 'Progressive Adoption', href: '/docs/progressive-adoption' },
      { label: 'Protecting Your Agent (No Code)', href: '/docs/for-humans' },
    ],
  },
  {
    group: 'Core Concepts',
    pages: [
      { label: 'Issuers', href: '/docs/concepts/issuers' },
      { label: 'Passports', href: '/docs/concepts/passports' },
      { label: 'Gates', href: '/docs/concepts/gates' },
      { label: 'Anonymous Access', href: '/docs/concepts/anonymous-access' },
      { label: 'Guardrails', href: '/docs/concepts/guardrails' },
      { label: 'Trust Profiles', href: '/docs/concepts/trust-profiles' },
      { label: 'Service Catalogs', href: '/docs/concepts/catalogs' },
      { label: 'Commerce & Billing', href: '/docs/concepts/commerce' },
      { label: 'Attestations', href: '/docs/concepts/attestations' },
    ],
  },
  {
    group: 'Guides',
    pages: [
      { label: 'Protecting Claude', href: '/docs/guides/protect-claude' },
      { label: 'Protecting OpenAI Agents', href: '/docs/guides/protect-openai' },
      { label: 'MCP Server Integration', href: '/docs/guides/mcp-server' },
      { label: 'Agent Autonomy', href: '/docs/guides/agent-autonomy' },
      { label: 'Custom Constraints', href: '/docs/guides/custom-constraints' },
      { label: 'Audit Trail', href: '/docs/guides/audit-trail' },
    ],
  },
  {
    group: 'SDK Reference',
    pages: [
      { label: 'Python SDK', href: '/docs/sdk/python' },
      { label: 'TypeScript SDK', href: '/docs/sdk/typescript' },
      { label: 'MCP Tools', href: '/docs/sdk/mcp-tools' },
    ],
  },
  {
    group: 'Templates',
    pages: [
      { label: 'Overview', href: '/docs/templates' },
      { label: 'Personal Productivity', href: '/docs/templates/personal-productivity' },
      { label: 'Business Operations', href: '/docs/templates/business-operations' },
      { label: 'Developer Tools', href: '/docs/templates/developer-tools' },
      { label: 'Finance & Commerce', href: '/docs/templates/finance-commerce' },
      { label: 'Research & Content', href: '/docs/templates/research-content' },
    ],
  },
  {
    group: 'API Reference',
    pages: [
      { label: 'Authentication', href: '/docs/api-reference/authentication' },
      { label: 'Issuers', href: '/docs/api-reference/issuers' },
      { label: 'Passports', href: '/docs/api-reference/passports' },
      { label: 'Gates', href: '/docs/api-reference/gates' },
      { label: 'Authorize', href: '/docs/api-reference/authorize' },
      { label: 'Guardrails', href: '/docs/api-reference/guardrails' },
      { label: 'Commerce', href: '/docs/api-reference/commerce' },
      { label: 'Discovery', href: '/docs/api-reference/discovery' },
      { label: 'Audit Trail', href: '/docs/api-reference/audit-trail' },
    ],
  },
  {
    group: 'Use Cases',
    pages: [
      { label: 'Travel Agent', href: '/docs/use-cases/travel-agent' },
      { label: 'Enterprise Research', href: '/docs/use-cases/enterprise-research' },
      { label: 'Data Pipeline', href: '/docs/use-cases/data-pipeline' },
      { label: 'SaaS Pricing', href: '/docs/use-cases/saas-pricing' },
      { label: 'MCP Protection', href: '/docs/use-cases/mcp-protection' },
      { label: 'Cross-Org Trust', href: '/docs/use-cases/cross-org-trust' },
      { label: 'Anonymous Upgrade', href: '/docs/use-cases/anonymous-upgrade' },
    ],
  },
]

// ── Sidebar Section component ─────────────────────────────────────

function SidebarSection({
  group,
  pages,
  pathname,
  onNavigate,
}: {
  group: string
  pages: { label: string; href: string }[]
  pathname: string
  onNavigate?: () => void
}) {
  const isActive = pages.some((p) => p.href === pathname || (p.href === '/docs' && pathname === '/docs'))
  const [open, setOpen] = useState(isActive || group === 'Getting Started')

  return (
    <div className="docs-nav-section">
      <button
        className="docs-nav-group-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{group}</span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 opacity-50" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        )}
      </button>
      {open && (
        <ul className="docs-nav-list">
          {pages.map((page) => {
            const active = pathname === page.href || (page.href === '/docs' && pathname === '/docs')
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className={`docs-nav-link${active ? ' active' : ''}`}
                  onClick={onNavigate}
                >
                  {page.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// ── Sidebar content ───────────────────────────────────────────────

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="docs-sidebar-nav">
      {NAV_SECTIONS.map((section) => (
        <SidebarSection
          key={section.group}
          group={section.group}
          pages={section.pages}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

// ── Layout ────────────────────────────────────────────────────────

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="docs-root">
      {/* ── Top nav ────────────────────────────── */}
      <header className="docs-topnav">
        <div className="docs-topnav-inner">
          <div className="docs-topnav-left">
            <button
              className="docs-mobile-menu-btn"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="docs-logo-link">
              <SupravisorLogo className="h-[32px]" />
            </Link>
            <span className="docs-badge">Docs</span>
          </div>
          <div className="docs-topnav-right">
            <ThemeToggle />
            <Link href="/" className="docs-back-link">
              ← Back to Home
            </Link>
            <Link href="https://uniplex.ai/signup" className="docs-cta-btn">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <div className="docs-body">
        {/* ── Desktop Sidebar ─────────────────── */}
        <aside className="docs-sidebar">
          <Sidebar pathname={pathname} />
        </aside>

        {/* ── Mobile Sidebar overlay ─────────── */}
        {mobileSidebarOpen && (
          <>
            <div
              className="docs-overlay"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <aside className="docs-sidebar-mobile">
              <div className="docs-sidebar-mobile-header">
                <Link href="/" onClick={() => setMobileSidebarOpen(false)}>
                  <SupravisorLogo className="h-[28px]" />
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close navigation"
                  className="docs-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar
                pathname={pathname}
                onNavigate={() => setMobileSidebarOpen(false)}
              />
            </aside>
          </>
        )}

        {/* ── Main content ────────────────────── */}
        <main className="docs-main">
          <article className="docs-prose">
            {children}
          </article>
        </main>
      </div>

      <style>{`
        /* ── Docs layout ─────────────────── */
        .docs-root {
          min-height: 100vh;
          background: var(--color-background);
          color: var(--color-foreground);
        }

        /* Top nav */
        .docs-topnav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 56px;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
        }
        .docs-topnav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .docs-topnav-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .docs-topnav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .docs-logo-link {
          display: flex;
          align-items: center;
        }
        .docs-badge {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
        }
        .docs-back-link {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.8rem;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .docs-back-link:hover { color: var(--color-foreground); }
        .docs-cta-btn {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-background);
          background: var(--color-primary);
          padding: 0.4rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .docs-cta-btn:hover { background: var(--color-primary-hover); }
        .docs-mobile-menu-btn {
          display: none;
          padding: 0.375rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-muted);
          border-radius: 0.375rem;
        }
        .docs-mobile-menu-btn:hover { color: var(--color-foreground); }

        /* Body layout */
        .docs-body {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 56px);
        }

        /* Sidebar */
        .docs-sidebar {
          width: 260px;
          flex-shrink: 0;
          position: sticky;
          top: 56px;
          height: calc(100vh - 56px);
          overflow-y: auto;
          border-right: 1px solid var(--color-border);
          padding: 1.5rem 0;
          background: var(--color-surface);
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }
        .docs-sidebar::-webkit-scrollbar { width: 4px; }
        .docs-sidebar::-webkit-scrollbar-track { background: transparent; }
        .docs-sidebar::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 4px; }

        .docs-sidebar-nav {
          padding: 0 0.75rem;
        }

        .docs-nav-section {
          margin-bottom: 0.25rem;
        }

        .docs-nav-group-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.4rem 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
          border-radius: 0.375rem;
          transition: color 0.15s;
          margin-bottom: 0.125rem;
        }
        .docs-nav-group-btn:hover { color: var(--color-foreground); }

        .docs-nav-list {
          list-style: none;
          padding: 0;
          margin: 0 0 0.5rem 0;
        }

        .docs-nav-link {
          display: block;
          padding: 0.35rem 0.75rem;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.85rem;
          color: var(--color-muted);
          text-decoration: none;
          border-radius: 0.375rem;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .docs-nav-link:hover {
          color: var(--color-foreground);
          background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
        }
        .docs-nav-link.active {
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          font-weight: 500;
        }

        /* Main content */
        .docs-main {
          flex: 1;
          min-width: 0;
          padding: 2.5rem 2rem;
        }

        .docs-prose {
          max-width: 768px;
          margin: 0 auto;
        }

        /* Mobile overlay */
        .docs-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: var(--color-overlay);
        }
        .docs-sidebar-mobile {
          position: fixed;
          inset-y: 0;
          left: 0;
          z-index: 50;
          width: 280px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          overflow-y: auto;
          padding: 0 0 1.5rem;
        }
        .docs-sidebar-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1rem;
        }
        .docs-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-muted);
          padding: 0.25rem;
          border-radius: 0.375rem;
        }
        .docs-close-btn:hover { color: var(--color-foreground); }

        /* ── Prose styles ──────────────────── */
        .docs-prose .doc-h1,
        .docs-prose h1 {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.25;
          color: var(--color-foreground);
          margin: 0 0 1.5rem;
        }
        .docs-prose .doc-h2,
        .docs-prose h2 {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--color-foreground);
          margin: 2.5rem 0 1rem;
          padding-top: 0.5rem;
        }
        .docs-prose .doc-h3,
        .docs-prose h3 {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-foreground);
          margin: 2rem 0 0.75rem;
        }
        .docs-prose .doc-h4,
        .docs-prose h4 {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-foreground);
          margin: 1.5rem 0 0.5rem;
        }
        .docs-prose .doc-p,
        .docs-prose p {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: color-mix(in srgb, var(--color-foreground) 85%, transparent);
          margin: 0 0 1rem;
        }
        .docs-prose .doc-ul,
        .docs-prose ul {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: color-mix(in srgb, var(--color-foreground) 85%, transparent);
          padding-left: 1.5rem;
          margin: 0 0 1rem;
        }
        .docs-prose .doc-ol,
        .docs-prose ol {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: color-mix(in srgb, var(--color-foreground) 85%, transparent);
          padding-left: 1.5rem;
          margin: 0 0 1rem;
        }
        .docs-prose .doc-li,
        .docs-prose li {
          margin-bottom: 0.25rem;
        }
        .docs-prose .doc-link,
        .docs-prose a {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        }
        .docs-prose .doc-link:hover,
        .docs-prose a:hover {
          text-decoration-color: var(--color-primary);
        }
        .docs-prose .doc-blockquote,
        .docs-prose blockquote {
          border-left: 3px solid var(--color-border);
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          color: var(--color-muted);
        }
        .docs-prose .doc-hr,
        .docs-prose hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 2rem 0;
        }
        .docs-prose code:not(pre code) {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.82rem;
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          padding: 0.1rem 0.4rem;
          border-radius: 0.25rem;
          color: var(--color-primary);
        }
        .docs-prose .doc-pre,
        .docs-prose pre {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1rem 0 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }
        .docs-prose .doc-pre::-webkit-scrollbar,
        .docs-prose pre::-webkit-scrollbar { height: 4px; }
        .docs-prose .doc-pre::-webkit-scrollbar-thumb,
        .docs-prose pre::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 4px; }
        .docs-prose pre code {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--color-foreground);
          background: none;
          border: none;
          padding: 0;
        }
        .docs-prose .doc-table-wrap {
          overflow-x: auto;
          margin: 1rem 0 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
        }
        .docs-prose .doc-table,
        .docs-prose table {
          width: 100%;
          border-collapse: collapse;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.875rem;
        }
        .docs-prose table thead {
          background: var(--color-surface-2);
        }
        .docs-prose table th,
        .docs-prose table td {
          padding: 0.625rem 1rem;
          text-align: left;
          border-bottom: 1px solid var(--color-border);
        }
        .docs-prose table th {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .docs-prose table tr:last-child td { border-bottom: none; }
        .docs-prose table tbody tr:hover {
          background: color-mix(in srgb, var(--color-foreground) 3%, transparent);
        }

        /* ── Callout boxes ──────────────────── */
        .docs-prose .doc-callout {
          border-radius: 0.5rem;
          padding: 1rem 1.25rem;
          margin: 1.25rem 0;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.9rem;
          line-height: 1.65;
        }
        .docs-prose .doc-callout p { margin: 0; color: inherit; }
        .docs-prose .doc-callout-note {
          background: color-mix(in srgb, var(--color-primary) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
          color: color-mix(in srgb, var(--color-foreground) 90%, transparent);
        }
        .docs-prose .doc-callout-warning {
          background: color-mix(in srgb, var(--color-warning) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-warning) 30%, transparent);
          color: color-mix(in srgb, var(--color-foreground) 90%, transparent);
        }
        .docs-prose .doc-callout-tip {
          background: color-mix(in srgb, var(--color-success) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent);
          color: color-mix(in srgb, var(--color-foreground) 90%, transparent);
        }
        .docs-prose .doc-callout-info {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          color: var(--color-muted);
        }

        /* ── Card groups ────────────────────── */
        .docs-prose .doc-card-group {
          display: grid;
          gap: 1rem;
          margin: 1.25rem 0;
        }
        .docs-prose .doc-card-group-2 { grid-template-columns: repeat(2, 1fr); }
        .docs-prose .doc-card-group-3 { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 640px) {
          .docs-prose .doc-card-group-2,
          .docs-prose .doc-card-group-3 { grid-template-columns: 1fr; }
        }
        .docs-prose .doc-card-link {
          text-decoration: none;
        }
        .docs-prose .doc-card {
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 1.125rem 1.25rem;
          transition: border-color 0.15s;
          height: 100%;
        }
        .docs-prose .doc-card-link .doc-card:hover {
          border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
        }
        .docs-prose .doc-card-title {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-foreground);
          margin-bottom: 0.375rem;
        }
        .docs-prose .doc-card-body {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--color-muted);
        }
        .docs-prose .doc-card-body p { margin: 0; color: var(--color-muted); }

        /* ── Code group ─────────────────────── */
        .docs-prose .doc-code-group {
          margin: 1rem 0 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          overflow: hidden;
        }
        .docs-prose .doc-code-group pre {
          margin: 0;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid var(--color-border);
        }
        .docs-prose .doc-code-group pre:last-child { border-bottom: none; }

        /* ── Steps ──────────────────────────── */
        .docs-prose .doc-steps {
          counter-reset: step-counter;
          margin: 1.25rem 0;
        }
        .docs-prose .doc-step {
          position: relative;
          padding-left: 3rem;
          padding-bottom: 1.5rem;
          counter-increment: step-counter;
        }
        .docs-prose .doc-step::before {
          content: counter(step-counter);
          position: absolute;
          left: 0;
          top: 0.1rem;
          width: 1.75rem;
          height: 1.75rem;
          background: var(--color-primary);
          color: var(--color-background);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .docs-prose .doc-step-title {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-foreground);
          margin-bottom: 0.5rem;
        }
        .docs-prose .doc-step-body {
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: color-mix(in srgb, var(--color-foreground) 80%, transparent);
        }
        .docs-prose .doc-step-body p { margin: 0 0 0.5rem; color: inherit; }

        /* ── Accordion ──────────────────────── */
        .docs-prose .doc-accordion-group {
          margin: 1.25rem 0;
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .docs-prose .doc-accordion {
          border-bottom: 1px solid var(--color-border);
        }
        .docs-prose .doc-accordion:last-child { border-bottom: none; }
        .docs-prose .doc-accordion-summary {
          padding: 0.875rem 1.25rem;
          cursor: pointer;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-foreground);
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
          background: var(--color-surface-2);
          transition: background 0.15s;
        }
        .docs-prose .doc-accordion-summary:hover {
          background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
        }
        .docs-prose .doc-accordion-summary::-webkit-details-marker { display: none; }
        .docs-prose .doc-accordion[open] .doc-accordion-summary {
          color: var(--color-primary);
        }
        .docs-prose .doc-accordion-body {
          padding: 1rem 1.25rem;
          font-family: Inter, ui-sans-serif, sans-serif;
          font-size: 0.875rem;
          line-height: 1.7;
          color: color-mix(in srgb, var(--color-foreground) 80%, transparent);
        }
        .docs-prose .doc-accordion-body p { margin: 0 0 0.5rem; color: inherit; }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 768px) {
          .docs-mobile-menu-btn { display: flex; }
          .docs-sidebar { display: none; }
          .docs-back-link { display: none; }
          .docs-main { padding: 1.5rem 1rem; }
          .docs-prose .doc-h1,
          .docs-prose h1 { font-size: 1.5rem; }
          .docs-prose .doc-h2,
          .docs-prose h2 { font-size: 1.2rem; }
        }
        @media (min-width: 769px) {
          .docs-mobile-menu-btn { display: none; }
        }
      `}</style>
    </div>
  )
}
