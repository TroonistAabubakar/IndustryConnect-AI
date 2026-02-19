import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IndustryConnect AI - Multi-Industry Solutions',
  description: 'Your one-stop platform for pizza ordering, IT solutions, and fashion shopping powered by AI',
  keywords: 'pizza, restaurant, IT company, blockchain, software development, fashion, clothing, apparel',
  openGraph: {
    title: 'IndustryConnect AI',
    description: 'Multi-industry platform for food, technology, and fashion',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
