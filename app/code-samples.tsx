'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const sdkCode = `import { Supravisor } from 'supravisor'

const sv = new Supravisor({ apiKey: process.env.SUPRAVISOR_API_KEY })

// Issue a signed passport for your agent
const passport = await sv.passports.issue({
  agentId: 'my-booking-agent',
  permissions: ['flights:search', 'hotels:book'],
  constraints: {
    maxSpend: 500,         // USD limit per session
    rateLimit: '100/min',  // max 100 calls per minute
    expiresIn: '24h',
  },
})

// Verify at your API gate
const { decision, attestationId } = await sv.gates.check({
  gateId: 'gate_travel-api',
  passportId: passport.id,
  action: 'hotels:book',
})

if (decision === 'allow') {
  // Cryptographic proof of authorization
  console.log('Attestation:', attestationId)
}`

const restCode = `const response = await fetch('https://api.supravisor.ai/gates/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.SUPRAVISOR_API_KEY}\`
  },
  body: JSON.stringify({
    gate_id: 'gate_my-api',
    passport_id: agentPassportId,
    action: 'read:customers'
  })
})

const { decision, attestation_id } = await response.json()

if (decision === 'allow') {
  // Attestation is cryptographic proof
  return NextResponse.json(data)
}`

const tabs = [
  { id: 'sdk', label: 'TypeScript SDK', filename: 'agent-setup.ts', code: sdkCode, lang: 'ts' },
  { id: 'rest', label: 'REST API', filename: 'protect.ts', code: restCode, lang: 'ts' },
]

function highlightCode(code: string, lang: string): React.ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = []
    let remaining = line

    if (lang === 'json') {
      parts.push(<span key={`line-${i}`}>{highlightJson(remaining)}</span>)
    } else {
      const commentMatch = remaining.match(/\/\/.*$/)
      if (commentMatch && commentMatch.index !== undefined) {
        const before = remaining.slice(0, commentMatch.index)
        const comment = commentMatch[0]
        remaining = before
        parts.push(<span key={`pre-${i}`}>{highlightInline(remaining)}</span>)
        parts.push(
          <span key={`comment-${i}`} style={{ color: 'var(--color-muted)', opacity: 0.6, fontStyle: 'italic' }}>
            {comment}
          </span>
        )
      } else {
        parts.push(<span key={`line-${i}`}>{highlightInline(remaining)}</span>)
      }
    }

    return (
      <div key={i} className="leading-6">
        {parts}
      </div>
    )
  })
}

function highlightJson(text: string): React.ReactNode[] {
  if (!text.trim()) return [<span key="empty" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>{text}</span>]
  const parts: React.ReactNode[] = []
  const pattern = /("(?:[^"\\]|\\.)*")\s*(:)?/g
  let lastIndex = 0
  let m: RegExpExecArray | null

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(
        <span key={`t-${lastIndex}`} style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>
          {text.slice(lastIndex, m.index)}
        </span>
      )
    }
    if (m[2]) {
      parts.push(<span key={`k-${m.index}`} style={{ color: 'var(--color-primary)' }}>{m[1]}</span>)
      parts.push(<span key={`c-${m.index}`} style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>:</span>)
    } else {
      parts.push(<span key={`v-${m.index}`} style={{ color: 'var(--color-success)' }}>{m[1]}</span>)
    }
    lastIndex = m.index + m[0].length
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={`t-${lastIndex}`} style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>
        {text.slice(lastIndex)}
      </span>
    )
  }

  return parts.length ? parts : [<span key="plain" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>{text}</span>]
}

function highlightInline(text: string): React.ReactNode[] {
  if (!text) return [text]
  const parts: React.ReactNode[] = []
  const keywords = /\b(import|from|const|await|if|return|new)\b/g
  const singleQuoteStrings = /'[^']*'/g
  const doubleQuoteStrings = /"[^"]*"/g
  const templateStrings = /`[^`]*`/g

  let lastIndex = 0
  const allMatches: Array<{
    index: number
    length: number
    type: 'keyword' | 'string'
    text: string
  }> = []

  let m: RegExpExecArray | null
  while ((m = keywords.exec(text)) !== null) {
    allMatches.push({ index: m.index, length: m[0].length, type: 'keyword', text: m[0] })
  }
  while ((m = singleQuoteStrings.exec(text)) !== null) {
    allMatches.push({ index: m.index, length: m[0].length, type: 'string', text: m[0] })
  }
  while ((m = doubleQuoteStrings.exec(text)) !== null) {
    allMatches.push({ index: m.index, length: m[0].length, type: 'string', text: m[0] })
  }
  while ((m = templateStrings.exec(text)) !== null) {
    allMatches.push({ index: m.index, length: m[0].length, type: 'string', text: m[0] })
  }

  allMatches.sort((a, b) => a.index - b.index)

  for (const match of allMatches) {
    if (match.index < lastIndex) continue
    if (match.index > lastIndex) {
      parts.push(
        <span key={`t-${lastIndex}`} style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>
          {text.slice(lastIndex, match.index)}
        </span>
      )
    }
    if (match.type === 'keyword') {
      parts.push(<span key={`k-${match.index}`} style={{ color: 'var(--color-primary)' }}>{match.text}</span>)
    } else {
      parts.push(<span key={`s-${match.index}`} style={{ color: 'var(--color-success)' }}>{match.text}</span>)
    }
    lastIndex = match.index + match.length
  }
  if (lastIndex < text.length) {
    parts.push(
      <span key={`t-${lastIndex}`} style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>
        {text.slice(lastIndex)}
      </span>
    )
  }
  return parts.length
    ? parts
    : [<span key="plain" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>{text}</span>]
}

export function CodeSamples() {
  const [activeTab, setActiveTab] = useState('sdk')
  const tab = tabs.find((t) => t.id === activeTab)!

  return (
    <section id="developers" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4">Integrate in Minutes</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            TypeScript and Python SDKs, plus a REST API for any stack.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="rounded-xl overflow-hidden border"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            {/* Tab bar */}
            <div className="flex items-center border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-error)', opacity: 0.5 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-warning)', opacity: 0.5 }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-success)', opacity: 0.5 }} />
              </div>
              <div className="flex">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-3 text-xs font-mono transition-colors border-b-2 -mb-px cursor-pointer ${
                      activeTab === t.id
                        ? 'text-primary border-primary'
                        : 'text-muted hover:text-foreground border-transparent'
                    }`}
                  >
                    {t.filename}
                  </button>
                ))}
              </div>
            </div>
            {/* Code content */}
            <div className="p-6 text-sm font-mono overflow-x-auto">
              <code>{highlightCode(tab.code, tab.lang)}</code>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <span
            className="text-xs font-mono text-muted rounded-full px-3 py-1 border"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            npm install supravisor
          </span>
          <span className="text-xs font-mono text-muted">·</span>
          <span
            className="text-xs font-mono text-muted rounded-full px-3 py-1 border"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            pip install supravisor
          </span>
          <span className="text-xs font-mono text-muted">·</span>
          <span
            className="text-xs font-mono text-muted rounded-full px-3 py-1 border"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            REST API
          </span>
        </div>
      </div>
    </section>
  )
}
