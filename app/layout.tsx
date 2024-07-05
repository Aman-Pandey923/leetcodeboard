import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { NotificationProvider } from "@/context/NotificationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeetCode Board",
  description: "Online WhiteBoarding for LeetCode problems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <ClientLayout>{children}</ClientLayout>
        </NotificationProvider>
      </body>
    </html>
  )
}
