import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Supravisor — Run AI Agents Without Fear',
  description:
    'Supravisor gives your agents verifiable identity, enforces what they can do, and creates a cryptographic record of everything. Control without compromise.',
  metadataBase: new URL('https://supravisor.ai'),
  openGraph: {
    title: 'Supravisor — Run AI Agents Without Fear',
    description:
      'Supravisor gives your agents verifiable identity, enforces what they can do, and creates a cryptographic record of everything.',
    url: 'https://supravisor.ai',
    siteName: 'Supravisor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supravisor — Run AI Agents Without Fear',
    description:
      'Supravisor gives your agents verifiable identity, enforces what they can do, and creates a cryptographic record of everything.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
