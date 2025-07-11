"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface Transaction {
  id: string
  date: string
  time: string
  amount: string
  status: string
  bank?: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("mining")
  const [miningTransactions, setMiningTransactions] = useState<Transaction[]>([])
  const [withdrawalTransactions, setWithdrawalTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      try {
        // Load transaction history from localStorage
        const savedMiningHistory = JSON.parse(localStorage.getItem("miningHistory") || "[]")
        const savedWithdrawalHistory = JSON.parse(localStorage.getItem("withdrawalHistory") || "[]")

        setMiningTransactions(savedMiningHistory)
        setWithdrawalTransactions(savedWithdrawalHistory)
      } catch (e) {
        console.error("Error loading transaction history:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={() => router.push("/")} className="text-white mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Transaction History</h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("mining")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "mining" ? "text-green-500 border-b-2 border-green-500" : "text-gray-400"
            }`}
          >
            Mining
          </button>
          <button
            onClick={() => setActiveTab("withdrawal")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "withdrawal" ? "text-green-500 border-b-2 border-green-500" : "text-gray-400"
            }`}
          >
            Withdrawals
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {!isLoaded ? (
            <div className="text-center text-gray-400 py-8">Loading transactions...</div>
          ) : activeTab === "mining" ? (
            miningTransactions.length > 0 ? (
              miningTransactions.map((tx) => (
                <div key={tx.id} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white">{tx.id}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{tx.date}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{tx.time}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-green-500">₦{tx.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-500">{tx.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">No mining transactions found</div>
            )
          ) : withdrawalTransactions.length > 0 ? (
            withdrawalTransactions.map((tx) => (
              <div key={tx.id} className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white">{tx.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{tx.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{tx.time}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-green-500">₦{tx.amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Bank:</span>
                  <span className="text-white">{tx.bank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-500">{tx.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">No withdrawal transactions found</div>
          )}
        </div>
      </div>
    </main>
  )
}
