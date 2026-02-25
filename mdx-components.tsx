import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import React from 'react'

// ── Mintlify component replacements ──────────────────────────────

interface CardProps {
  title: string
  icon?: string
  href?: string
  color?: string
  children?: React.ReactNode
}

function Card({ title, href, children }: CardProps) {
  const inner = (
    <div className="doc-card">
      <div className="doc-card-title">{title}</div>
      {children && <div className="doc-card-body">{children}</div>}
    </div>
  )
  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className="doc-card-link">{inner}</a>
    }
    return <Link href={href} className="doc-card-link">{inner}</Link>
  }
  return inner
}

interface CardGroupProps {
  cols?: number
  children?: React.ReactNode
}

function CardGroup({ cols = 2, children }: CardGroupProps) {
  return (
    <div className={`doc-card-group doc-card-group-${cols}`}>
      {children}
    </div>
  )
}

function Note({ children }: { children?: React.ReactNode }) {
  return <div className="doc-callout doc-callout-note">{children}</div>
}

function Warning({ children }: { children?: React.ReactNode }) {
  return <div className="doc-callout doc-callout-warning">{children}</div>
}

function Tip({ children }: { children?: React.ReactNode }) {
  return <div className="doc-callout doc-callout-tip">{children}</div>
}

function Info({ children }: { children?: React.ReactNode }) {
  return <div className="doc-callout doc-callout-info">{children}</div>
}

function CodeGroup({ children }: { children?: React.ReactNode }) {
  return <div className="doc-code-group">{children}</div>
}

interface StepProps {
  title?: string
  children?: React.ReactNode
}

function Steps({ children }: { children?: React.ReactNode }) {
  return <div className="doc-steps">{children}</div>
}

function Step({ title, children }: StepProps) {
  return (
    <div className="doc-step">
      {title && <div className="doc-step-title">{title}</div>}
      <div className="doc-step-body">{children}</div>
    </div>
  )
}

function AccordionGroup({ children }: { children?: React.ReactNode }) {
  return <div className="doc-accordion-group">{children}</div>
}

interface AccordionProps {
  title?: string
  children?: React.ReactNode
}

function Accordion({ title, children }: AccordionProps) {
  return (
    <details className="doc-accordion">
      {title && <summary className="doc-accordion-summary">{title}</summary>}
      <div className="doc-accordion-body">{children}</div>
    </details>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements for nice prose
    h1: ({ children }) => <h1 className="doc-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="doc-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="doc-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="doc-h4">{children}</h4>,
    p: ({ children }) => <p className="doc-p">{children}</p>,
    ul: ({ children }) => <ul className="doc-ul">{children}</ul>,
    ol: ({ children }) => <ol className="doc-ol">{children}</ol>,
    li: ({ children }) => <li className="doc-li">{children}</li>,
    blockquote: ({ children }) => <blockquote className="doc-blockquote">{children}</blockquote>,
    code: ({ children, className }) => (
      <code className={`doc-code${className ? ` ${className}` : ''}`}>{children}</code>
    ),
    pre: ({ children }) => <pre className="doc-pre">{children}</pre>,
    table: ({ children }) => (
      <div className="doc-table-wrap">
        <table className="doc-table">{children}</table>
      </div>
    ),
    a: ({ href, children }) => {
      if (href?.startsWith('http')) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="doc-link">{children}</a>
      }
      return <Link href={href ?? '#'} className="doc-link">{children}</Link>
    },
    hr: () => <hr className="doc-hr" />,
    // Mintlify custom components
    Card,
    CardGroup,
    Note,
    Warning,
    Tip,
    Info,
    CodeGroup,
    Steps,
    Step,
    AccordionGroup,
    Accordion,
    ...components,
  }
}
