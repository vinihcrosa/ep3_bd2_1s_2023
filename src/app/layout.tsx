'use client'

import { Inter } from 'next/font/google'
import GlobalStyle from './globalStyles';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyChessChampionship',
  description: 'Este é seu dashboard de campeonatos de xadrez',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GlobalStyle />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
