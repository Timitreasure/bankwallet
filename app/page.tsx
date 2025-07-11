"use client"

import { useState, useEffect } from "react"
import LoginForm from "@/components/login-form"
import LoadingOverlay from "@/components/loading-overlay"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    accountNumber: "",
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if user data exists in localStorage
    if (typeof window !== "undefined") {
      try {
        const savedUserData = localStorage.getItem("userData")
        if (savedUserData) {
          setUserData(JSON.parse(savedUserData))
          setShowDashboard(true)
        }
      } catch (e) {
        console.error("Error loading user data:", e)
      }
    }
  }, [])

  const handleStartEarning = (data: typeof userData) => {
    setUserData(data)
    setIsLoading(true)

    // Save user data to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(data))

      // Initialize empty transaction history
      if (!localStorage.getItem("miningHistory")) {
        localStorage.setItem("miningHistory", JSON.stringify([]))
      }
      if (!localStorage.getItem("withdrawalHistory")) {
        localStorage.setItem("withdrawalHistory", JSON.stringify([]))
      }

      // Initialize wallet balance to 0
      if (!localStorage.getItem("walletBalance")) {
        localStorage.setItem("walletBalance", "0")
      }
    }

    // Simulate loading for 5 seconds
    setTimeout(() => {
      setIsLoading(false)
      setShowDashboard(true)
    }, 5000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative bg-black">
      {!isClient ? (
        <div className="text-white">Loading...</div>
      ) : !showDashboard ? (
        <LoginForm onSubmit={handleStartEarning} />
      ) : (
        <Dashboard userData={userData} />
      )}

      {isLoading && <LoadingOverlay />}
    </main>
  )
}
