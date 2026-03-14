import type { Metadata } from 'next'
import { Geist_Mono, Press_Start_2P } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const pressStart2P = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'cc-board · Claude Code Dashboard',
  description: 'Local Claude Code analytics. Reads directly from ~/.claude/',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} ${pressStart2P.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-56 min-h-screen overflow-x-hidden bg-background">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
