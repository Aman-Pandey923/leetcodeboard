"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface NotificationContextProps {
  notification: string | null
  setNotification: (message: string | null) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<string | null>(null)

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    )
  }
  return context
}
