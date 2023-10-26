"use client"
import { Provider as ReduxProvider } from "react-redux";
import { Inter } from 'next/font/google'

import './globals.css'
import store from '@/config/StoreConfig';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider store={store}>
        {children}
        </ReduxProvider>
        </body>
    </html>
  )
}
