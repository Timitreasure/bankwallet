"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
  const [showReceipt, setShowReceipt] = useState(true) // Start with receipt showing
  const [userPhone, setUserPhone] = useState("09059089490")
  const [transactionRef, setTransactionRef] = useState("")
  const [seasonId, setSeasonId] = useState("")
  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getDate()}th, ${currentDate.getFullYear()} ${currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}`

  // Generate random transaction reference
  const generateReference = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz"
    let result = ""
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Generate random season ID
  const generateSeasonId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let result = ""
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  useEffect(() => {
    // Generate transaction reference and season ID only once on client side
    setTransactionRef(generateReference())
    setSeasonId(generateSeasonId())

    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      // Update balance in localStorage
      const currentBalance = localStorage.getItem("walletBalance")
      if (currentBalance) {
        const newBalance = Number.parseInt(currentBalance) - 86000
        localStorage.setItem("walletBalance", Math.max(0, newBalance).toString())
      }

      // Try to get user phone from localStorage
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}")
        if (userData.phone) {
          setUserPhone(userData.phone)
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }

      // Add to withdrawal history
      try {
        const newTransaction = {
          id: `W${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toTimeString().split(" ")[0],
          amount: "86,000.00",
          bank: "Bank Wallet",
          status: "Successful",
        }

        const withdrawalHistory = JSON.parse(localStorage.getItem("withdrawalHistory") || "[]")
        withdrawalHistory.push(newTransaction)
        localStorage.setItem("withdrawalHistory", JSON.stringify(withdrawalHistory))
      } catch (e) {
        console.error("Error updating withdrawal history:", e)
      }
    }
  }, [])

  const handleBackToDashboard = () => {
    router.push("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <div className="w-full max-w-md flex flex-col">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Amount */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold">₦86,000.00</h1>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <p className="text-green-500 text-lg">Successful Transaction</p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Recipient</p>
            <div className="flex justify-between">
              <p className="font-bold text-lg">Account number</p>
              <p className="text-gray-700">{userPhone}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Biller Type</p>
            <p className="font-bold text-lg">Bank Wallet withdrawal</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Transaction Reference</p>
            <p className="font-bold text-lg">{transactionRef || "ktpubbumtftsmpyskvxr"}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="font-bold text-lg">₦86,000.00</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Fee</p>
              <p className="font-bold text-lg">₦0.00</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Account Type</p>
              <p className="font-bold text-lg">Wallet</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date / Time</p>
              <p className="text-gray-700">{formattedDate}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Season ID</p>
            <p className="font-bold text-lg">{seasonId || "JLRBHHPZEQWLLZQDNOEP"}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={handleBackToDashboard} className="text-blue-500 underline">
            Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  )
}
