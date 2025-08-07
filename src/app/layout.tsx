// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { inter, spaceGrotesk } from './fonts'

export const metadata: Metadata = {
  title: 'BachelorOS',
  description: 'Your city survival OS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
