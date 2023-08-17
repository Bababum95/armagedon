import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Main from '@/components/Main/Main'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ARMAGEDDON',
  icons: {
    icon: '/images/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <Main>
          {children}
        </Main>
        <Footer />
      </body>
    </html>
  )
}
