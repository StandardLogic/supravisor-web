'use client'

import { motion } from 'framer-motion'
import {
  UserX,
  ShieldOff,
  FileQuestion,
  Fingerprint,
  ShieldCheck,
  Gauge,
  ScrollText,
  Cpu,
  Search,
  Lock,
  Clock,
  Scale,
  Shield,
  Globe,
  Zap,
  Users,
  ArrowLeftRight,
} from 'lucide-react'
import { LandingNav } from './landing-nav'
import { HowItWorks } from './how-it-works'
import { CodeSamples } from './code-samples'
import { LandingFooter } from './landing-footer'
import { WaitlistForm } from '@/components/waitlist-form'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <LandingNav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section id="waitlist" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid + glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              opacity: 0.3,
            }}
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, var(--color-primary) 0%, transparent 70%)',
              opacity: 0.06,
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border mb-8"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'var(--color-primary)' + '15' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-primary)' }} />
            Coming Soon · Join the waitlist
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-mono font-bold tracking-tight mb-6"
            style={{ color: 'var(--color-foreground)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Run AI Agents{' '}
            <span style={{ color: 'var(--color-primary)' }}>Without Fear</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Supravisor gives your agents verifiable identity, enforces what they can do, and creates a
            cryptographic record of everything. Control without compromise.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <WaitlistForm />
            <p className="text-muted text-sm mt-4" style={{ color: 'var(--color-muted)' }}>
              No spam. Early access to the private beta.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm mt-10"
            style={{ color: 'var(--color-muted)', opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: Globe, label: 'Open Protocol' },
              { icon: Lock, label: 'Ed25519 Signed' },
              { icon: Shield, label: 'MCP Native' },
            ].map((badge, i) => (
              <span key={badge.label} className="flex items-center gap-1.5">
                {i > 0 && <span className="mr-1" style={{ color: 'var(--color-border)' }}>·</span>}
                <badge.icon className="w-3.5 h-3.5" />
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section id="problem" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4 leading-tight md:leading-snug">
              Powerful Agents. No Credentials.
              <br />
              <span style={{ color: 'var(--color-primary)' }}>No Controls.</span>
            </h2>
            <p className="text-2xl font-mono font-medium mt-6">That&apos;s why we built Supravisor.</p>
            <p className="text-lg max-w-3xl mx-auto mt-4 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Instead of API keys with god-mode access, every agent carries a signed passport. Instead of
              hoping agents stay in bounds, verification gates enforce it. Instead of trust-me audit logs,
              every action produces a cryptographic receipt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: UserX,
                title: 'No Identity',
                desc: 'Your agents call APIs, book flights, and move money with zero verifiable credentials. Anyone can impersonate them.',
              },
              {
                icon: ShieldOff,
                title: 'No Control',
                desc: 'No spending limits. No rate controls. No way to revoke access instantly when something goes wrong.',
              },
              {
                icon: FileQuestion,
                title: 'No Proof',
                desc: "When disputes happen, there's no audit trail. No cryptographic proof of who did what, when, and why.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-8"
                style={{ background: 'var(--color-surface-2)' }}
              >
                <card.icon className="w-10 h-10 mb-5" style={{ color: 'var(--color-primary)', opacity: 0.7 }} />
                <h3 className="text-xl font-mono font-semibold mb-3">{card.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Code Samples ─────────────────────────────────────────── */}
      <CodeSamples />

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
              Everything You Need for Agent Trust
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Built from the ground up for the autonomous agent economy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Start enforcing agent policy in minutes — no backend required',
                desc: "Issue a passport and the SDK enforces your constraints locally. Add a gate when you're ready for an audit trail. Never get locked into infrastructure you don't need yet.",
                badge: '5-minute setup',
                highlight: true,
              },
              {
                icon: Users,
                title: 'Deploy infrastructure before your agents are ready',
                desc: 'When an agent hits a protected resource without credentials, the gate tells it exactly where to get them. Ops teams can set up trust infrastructure first — agents self-onboard.',
                badge: 'Infrastructure-first',
                highlight: true,
              },
              {
                icon: ArrowLeftRight,
                title: 'Agent-to-agent commerce with cryptographic receipts',
                desc: 'Every transaction produces a signed attestation held by both parties. No disputes, no chargebacks, no he-said-she-said. Just math.',
                badge: 'Trustless',
                highlight: true,
              },
              {
                icon: Fingerprint,
                title: 'Ed25519 Signatures',
                desc: 'Every passport, attestation, and transaction is cryptographically signed with Ed25519. Verifiable by anyone, tamper-proof by design.',
              },
              {
                icon: Gauge,
                title: 'Constraint Evaluators',
                desc: 'Spending caps, rate limits, domain allowlists, PII controls, approval workflows, and more. All enforced automatically.',
              },
              {
                icon: ShieldCheck,
                title: 'Three Security Levels',
                desc: 'L1 verifies any valid passport.\nL2 requires trusted issuers.\nL3 adds proof of possession.\nChoose the right level for each resource.',
              },
              {
                icon: ScrollText,
                title: 'Real-time Audit Trail',
                desc: 'Every authorization decision creates a signed attestation. Full audit trail with cryptographic proof of who did what, when.',
              },
              {
                icon: Cpu,
                title: 'MCP Native',
                desc: 'First-class Model Context Protocol support. Protect MCP servers and tools with the same trust infrastructure.',
              },
              {
                icon: Globe,
                title: 'Open Protocol',
                desc: 'No vendor lock-in. Run your own gates. Verify credentials independently. Build on a standard, not a platform.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-8"
                style={
                  feature.highlight
                    ? {
                        background: 'var(--color-primary)' + '0d',
                        border: '1px solid var(--color-primary)' + '33',
                      }
                    : { background: 'var(--color-surface-2)' }
                }
              >
                <div className="flex items-start justify-between mb-5">
                  <feature.icon
                    className="w-10 h-10"
                    style={{
                      color: 'var(--color-primary)',
                      opacity: feature.highlight ? 1 : 0.7,
                    }}
                  />
                  {feature.badge && (
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{ color: 'var(--color-primary)', background: 'var(--color-primary)' + '1a' }}
                    >
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3
                  className={`font-mono font-semibold mb-3 ${feature.highlight ? 'text-base leading-snug' : 'text-lg'}`}
                >
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-sm whitespace-pre-line" style={{ color: 'var(--color-muted)' }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commerce ─────────────────────────────────────────────── */}
      <section id="commerce" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
              Agent-to-Agent Commerce, Built In
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Enable agents to transact with cryptographic guarantees. Pricing, SLA commitments, and
              bilateral metering — all enforced and auditable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: feature list */}
            <motion.div {...fadeInUp} className="space-y-6">
              {[
                {
                  icon: Search,
                  title: 'Service Discovery',
                  desc: 'Agents discover available services and compare pricing, SLAs, and capabilities before committing.',
                },
                {
                  icon: Lock,
                  title: 'Cryptographic Pricing',
                  desc: 'Per-call, per-minute, and subscription pricing locked into signed credentials. No bait-and-switch.',
                },
                {
                  icon: Clock,
                  title: 'SLA Guarantees',
                  desc: 'Uptime and response time commitments enforced and verifiable. Agents choose services that meet their requirements.',
                },
                {
                  icon: Scale,
                  title: 'Bilateral Metering',
                  desc: 'Both sides hold signed receipts for every transaction. Disputes resolved with cryptographic proof, not he-said-she-said.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-primary)' + '1a' }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h4 className="font-mono font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: service listing */}
            <motion.div {...fadeInUp} className="space-y-3">
              <p className="text-xs text-muted font-mono text-center md:text-left" style={{ color: 'var(--color-muted)' }}>
                Example: Service Listing
              </p>
              <div className="rounded-2xl p-8" style={{ background: 'var(--color-surface-2)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-primary)' + '1a' }}
                  >
                    <Globe className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <div className="font-mono font-semibold">Acme Travel API</div>
                    <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      3 endpoints · signed terms
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'flights:search', price: '$0.002/call', sla: '99.9% uptime', latency: '<200ms p95' },
                    { action: 'flights:book', price: '$0.50/call', sla: '99.9% uptime', latency: '<500ms p95' },
                    { action: 'hotels:search', price: '$0.001/call', sla: '99.9% uptime', latency: '<150ms p95' },
                  ].map((endpoint, i) => (
                    <motion.div
                      key={endpoint.action}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="rounded-lg px-4 py-3"
                      style={{ background: 'var(--color-background)' + '80' }}
                    >
                      <div className="font-mono text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                        {endpoint.action}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                        <span>{endpoint.price}</span>
                        <span style={{ color: 'var(--color-border)' }}>·</span>
                        <span>{endpoint.sla}</span>
                        <span style={{ color: 'var(--color-border)' }}>·</span>
                        <span>{endpoint.latency}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs mt-5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Services publish signed terms. Agents compare and choose. Pricing can&apos;t change without
                  consent.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA / Waitlist ───────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
              Ready to Build with Trust?
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-4" style={{ color: 'var(--color-muted)' }}>
              Be among the first to run agents with verifiable identity and cryptographic control. Join the
              waitlist for early access.
            </p>
            <p className="text-sm mb-10" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
              Open protocol. No vendor lock-in.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
