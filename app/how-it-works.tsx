'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    title: 'Issue Credentials',
    description:
      'Give your agent a cryptographically signed passport with specific permissions, spending limits, and expiration. Ed25519 signatures. RFC 8785 canonicalization. Verifiable by anyone.',
    visual: 'passport',
  },
  {
    title: 'Protect Resources',
    description:
      'Deploy gates on your APIs, MCP servers, and tools. Three security levels (L1–L3). Gates verify credentials, check permissions, and enforce trust requirements.',
    visual: 'gate',
  },
  {
    title: 'Enforce Guardrails',
    description:
      'Control spending limits, rate limits, allowed domains, approval workflows, and data policies. Built-in constraint evaluators. All enforced automatically on every action.',
    visual: 'guardrails',
  },
  {
    title: 'Trust & Transact',
    description:
      'Enable agent-to-agent commerce with cryptographic proof. Pricing constraints, SLA guarantees, bilateral metering. Every transaction signed and auditable.',
    visual: 'transact',
  },
]

function StepVisual({ visual }: { visual: string }) {
  const base = 'w-full aspect-square max-w-xs mx-auto'

  if (visual === 'passport') {
    return (
      <div className={base}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.rect
            x="30" y="40" width="180" height="160" rx="16"
            style={{ fill: 'var(--color-surface-2)', stroke: 'var(--color-border)' }}
            strokeWidth="1.5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.rect
            x="50" y="60" width="80" height="8" rx="4"
            style={{ fill: 'var(--color-primary)' }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
          {[90, 108, 126].map((y, i) => (
            <motion.rect
              key={y}
              x="50" y={y} width={140 - i * 20} height="6" rx="3"
              style={{ fill: 'var(--color-surface-3)' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
          <motion.path
            d="M50 165 Q70 150 90 165 Q110 180 130 160 Q140 152 155 165"
            style={{ stroke: 'var(--color-primary)' }}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
          <motion.circle
            cx="185" cy="65" r="16"
            style={{ fill: 'var(--color-primary)', fillOpacity: 0.2, stroke: 'var(--color-primary)' }}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
          />
          <motion.path
            d="M177 65 L183 71 L193 59"
            style={{ stroke: 'var(--color-primary)' }}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          />
        </svg>
      </div>
    )
  }

  if (visual === 'gate') {
    return (
      <div className={base}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.rect
            x="80" y="30" width="80" height="180" rx="12"
            style={{ fill: 'var(--color-surface-2)', stroke: 'var(--color-border)' }}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          {[100, 120, 140].map((x, i) => (
            <motion.line
              key={x}
              x1={x} y1="50" x2={x} y2="190"
              style={{ stroke: 'var(--color-surface-3)' }}
              strokeWidth="3"
              initial={{ y1: 120 }}
              animate={{ y1: 50 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            />
          ))}
          <motion.rect
            x="10" y="95" width="50" height="50" rx="8"
            style={{ fill: 'var(--color-primary)', fillOpacity: 0.2, stroke: 'var(--color-primary)' }}
            strokeWidth="1.5"
            initial={{ x: -40 }}
            animate={{ x: 10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.rect
            x="20" y="110" width="30" height="4" rx="2"
            style={{ fill: 'var(--color-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
          <motion.rect
            x="20" y="118" width="22" height="4" rx="2"
            style={{ fill: 'var(--color-primary)', fillOpacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
          <motion.circle
            cx="195" cy="120" r="22"
            style={{ fill: 'var(--color-success)', fillOpacity: 0.2, stroke: 'var(--color-success)' }}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: 'spring' }}
          />
          <motion.path
            d="M185 120 L192 127 L205 113"
            style={{ stroke: 'var(--color-success)' }}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
          />
        </svg>
      </div>
    )
  }

  if (visual === 'guardrails') {
    return (
      <div className={base}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.rect
            x="30" y="30" width="180" height="180" rx="16"
            style={{ fill: 'var(--color-surface-2)', stroke: 'var(--color-border)' }}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          {[
            { y: 60, label: 'Spend', pct: 0.65, color: 'var(--color-primary)' },
            { y: 95, label: 'Rate', pct: 0.4, color: 'var(--color-success)' },
            { y: 130, label: 'Calls', pct: 0.85, color: 'var(--color-warning)' },
          ].map((bar, i) => (
            <g key={bar.label}>
              <motion.text
                x="50" y={bar.y + 10}
                style={{ fill: 'var(--color-muted)' }}
                fontSize="11"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {bar.label}
              </motion.text>
              <rect
                x="95" y={bar.y} width="100" height="16" rx="4"
                style={{ fill: 'var(--color-surface-3)' }}
              />
              <motion.rect
                x="95" y={bar.y} width={100 * bar.pct} height="16" rx="4"
                style={{ fill: bar.color }}
                initial={{ width: 0 }}
                animate={{ width: 100 * bar.pct }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              />
            </g>
          ))}
          {[170, 190].map((y, i) => (
            <g key={y}>
              <motion.rect
                x="50" y={y} width="14" height="14" rx="3"
                style={{ stroke: 'var(--color-primary)', fill: 'var(--color-primary)', fillOpacity: 0.1 }}
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0 + i * 0.15 }}
              />
              <motion.path
                d={`M${53} ${y + 7} L${55} ${y + 10} L${61} ${y + 4}`}
                style={{ stroke: 'var(--color-primary)' }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.2 }}
              />
              <motion.rect
                x="74" y={y + 3} width={70 - i * 15} height="6" rx="3"
                style={{ fill: 'var(--color-surface-3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.15 }}
              />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  // transact
  return (
    <div className={base}>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.circle
          cx="60" cy="120" r="32"
          style={{ fill: 'var(--color-primary)', fillOpacity: 0.1, stroke: 'var(--color-primary)' }}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.text
          x="60" y="125" textAnchor="middle"
          style={{ fill: 'var(--color-primary)' }}
          fontSize="13"
          fontFamily="monospace"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A
        </motion.text>
        <motion.circle
          cx="180" cy="120" r="32"
          style={{ fill: 'var(--color-success)', fillOpacity: 0.1, stroke: 'var(--color-success)' }}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <motion.text
          x="180" y="125" textAnchor="middle"
          style={{ fill: 'var(--color-success)' }}
          fontSize="13"
          fontFamily="monospace"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          B
        </motion.text>
        <motion.line
          x1="95" y1="110" x2="145" y2="110"
          style={{ stroke: 'var(--color-primary)' }}
          strokeWidth="2"
          markerEnd="url(#arrowPrimary)"
          initial={{ x2: 95 }}
          animate={{ x2: 145 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        <motion.line
          x1="145" y1="130" x2="95" y2="130"
          style={{ stroke: 'var(--color-success)' }}
          strokeWidth="2"
          markerEnd="url(#arrowSuccess)"
          initial={{ x2: 145 }}
          animate={{ x2: 95 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.rect
          x="95" y="155" width="50" height="35" rx="6"
          style={{ fill: 'var(--color-surface-2)', stroke: 'var(--color-border)' }}
          strokeWidth="1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        />
        <motion.rect
          x="103" y="165" width="34" height="4" rx="2"
          style={{ fill: 'var(--color-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        />
        <motion.rect
          x="103" y="175" width="24" height="4" rx="2"
          style={{ fill: 'var(--color-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        />
        <defs>
          <marker id="arrowPrimary" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" style={{ fill: 'var(--color-primary)' }} />
          </marker>
          <marker id="arrowSuccess" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
            <path d="M8 0 L0 4 L8 8 Z" style={{ fill: 'var(--color-success)' }} />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(advance, 5000)
    return () => clearInterval(timer)
  }, [paused, advance])

  function handleClick(i: number) {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 10000)
  }

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">
            Four Primitives. Complete Control.
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to build verifiable trust between agents and the resources they access.
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all font-mono cursor-pointer ${
                active === i
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-foreground hover:bg-surface-2'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  active === i
                    ? 'bg-primary text-background'
                    : 'bg-surface-3 text-muted'
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[320px]">
          {/* Visual */}
          <div className="order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <StepVisual visual={steps[active].visual} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-background flex items-center justify-center text-xs font-bold">
                    {active + 1}
                  </span>
                  Step {active + 1} of {steps.length}
                </div>
                <h3 className="text-2xl md:text-3xl font-mono font-bold mb-4">
                  {steps[active].title}
                </h3>
                <p className="text-muted text-lg leading-relaxed">
                  {steps[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mt-12 max-w-sm mx-auto">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-3)' }}>
              {active === i && !paused ? (
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-primary)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={`progress-${active}-${paused}`}
                />
              ) : (
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    background: i < active || (i === active && paused) ? 'var(--color-primary)' : 'transparent',
                    width: i < active || (i === active && paused) ? '100%' : '0%',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
