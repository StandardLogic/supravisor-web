'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SupravisorLogo } from '@/components/logo'

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#commerce', label: 'Commerce' },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-background/80 backdrop-blur-lg border-border/40'
            : 'bg-transparent border-transparent'
        }`}
        style={{ borderColor: scrolled ? 'var(--color-border)' : 'transparent' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <SupravisorLogo className="h-[36px]" />
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-mono text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="https://uniplex.ai/signup"
              className="text-xs font-mono text-background font-medium py-1.5 px-4 rounded-lg transition-colors"
              style={{ background: 'var(--color-primary)' }}
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-muted hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ background: 'var(--color-overlay)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-background border-l transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <SupravisorLogo className="h-[36px]" />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-muted hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="block py-3 text-base font-mono text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 mt-4 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between py-3">
              <span className="text-base font-mono text-muted">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              href="https://uniplex.ai/signup"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center font-mono text-background font-medium py-3 px-4 rounded-lg transition-colors"
              style={{ background: 'var(--color-primary)' }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
