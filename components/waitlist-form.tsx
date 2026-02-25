'use client'

import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export function WaitlistForm({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    const { error } = await getSupabase().from('waitlist').insert({ email })

    if (!error) {
      setStatus('success')
      setEmail('')
      return
    }

    // Postgres unique constraint violation → duplicate email
    if (error.code === '23505') {
      setStatus('duplicate')
    } else {
      console.error('Waitlist insert error:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center justify-center gap-2 font-mono text-sm py-3 ${className}`} style={{ color: 'var(--color-success)' }}>
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    )
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 font-mono text-sm px-4 py-3 rounded-lg disabled:opacity-50"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-foreground)',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-mono font-medium px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap disabled:opacity-50 cursor-pointer"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-background)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary-hover)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-primary)' }}
        >
          {status === 'loading' ? 'Joining…' : 'Get Early Access'}
        </button>
      </form>

      {/* Status messages */}
      {status === 'duplicate' && (
        <p className="text-center mt-3 text-sm font-mono" style={{ color: 'var(--color-warning)' }}>
          Already signed up! We&apos;ll reach out soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center mt-3 text-sm font-mono" style={{ color: 'var(--color-error)' }}>
          Something went wrong — please try again.
        </p>
      )}
    </div>
  )
}
