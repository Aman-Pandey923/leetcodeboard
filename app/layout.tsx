import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeetCode Board",
  description: "Online WhiteBoarding for LeetCode problems.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <SessionProvider session={session} children={children} />
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
