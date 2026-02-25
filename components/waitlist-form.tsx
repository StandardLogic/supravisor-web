'use client'

import { useState } from 'react'

export function WaitlistForm({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('https://formspree.io/f/xpwzgkdo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center justify-center gap-2 font-mono text-primary ${className}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md mx-auto ${className}`}
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        className="flex-1 font-mono text-sm px-4 py-3 rounded-lg bg-surface-2 border border-border text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-mono font-medium px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-background transition-colors text-sm whitespace-nowrap disabled:opacity-50"
      >
        {status === 'loading' ? 'Joining…' : 'Get Early Access'}
      </button>
      {status === 'error' && (
        <p className="text-error text-xs mt-1 sm:absolute sm:bottom-0">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
