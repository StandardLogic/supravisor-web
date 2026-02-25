'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { getStoredTheme, setStoredTheme, applyTheme } from '@/lib/theme'

export function ThemeToggle() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = getStoredTheme()
    setMode(stored)
    applyTheme(stored)
  }, [])

  function toggle() {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    setStoredTheme(next)
    applyTheme(next)
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-muted hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
