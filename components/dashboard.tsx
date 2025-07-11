"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Send, HelpCircle } from "lucide-react"

interface DashboardProps {
  userData: {
    phone: string
    name: string
    accountNumber: string
  }
}

export default function Dashboard({ userData }: DashboardProps) {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showMinerPopup, setShowMinerPopup] = useState(false)
  const [isMining, setIsMining] = useState(false)
  const [countdown, setCountdown] = useState(8)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Get balance from localStorage if it exists
    if (typeof window !== "undefined") {
      try {
        const savedBalance = localStorage.getItem("walletBalance")
        if (savedBalance) {
          setBalance(Number.parseInt(savedBalance))
        }
      } catch (e) {
        console.error("Error loading balance:", e)
      }
    }
  }, [])

  const handleMineClick = () => {
    setShowWelcomePopup(true)
  }

  const handleStartMining = () => {
    setShowWelcomePopup(false)
    setIsMining(true)

    // Start countdown from 8 seconds
    setCountdown(8)

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          setIsMining(false)
          setShowSuccessPopup(true)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  const handleSuccessOk = () => {
    setShowSuccessPopup(false)
    const newBalance = 86000
    setBalance(newBalance)

    // Save to localStorage only on client
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("walletBalance", newBalance.toString())

        // Add to transaction history
        const newTransaction = {
          id: `M${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toTimeString().split(" ")[0],
          amount: "86,000.00",
          status: "Successful",
        }

        const miningHistory = JSON.parse(localStorage.getItem("miningHistory") || "[]")
        miningHistory.push(newTransaction)
        localStorage.setItem("miningHistory", JSON.stringify(miningHistory))
      } catch (e) {
        console.error("Error saving mining data:", e)
      }
    }
  }

  const handleWithdrawClick = () => {
    // Save current balance to localStorage before navigating
    if (typeof window !== "undefined") {
      localStorage.setItem("walletBalance", balance.toString())
    }
    router.push("/withdraw")
  }

  const handleBuyMinerClick = () => {
    setShowMinerPopup(true)
  }

  const handleTransactionHistory = () => {
    router.push("/history")
  }

  const handleFaqClick = () => {
    router.push("/faq")
  }

  if (!isClient) {
    return <div className="text-white text-center">Loading dashboard...</div>
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Wallet Balance Card */}
      <div className="w-full bg-green-500 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-medium">Wallet Balance</h2>
          <button onClick={handleTransactionHistory} className="text-white text-sm">
            Transaction history &gt;
          </button>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          ₦{balance.toLocaleString()}
          {balance === 0 ? "" : ".00"}
        </h1>

        <div className="mb-4">
          <p className="text-white">
            NAME : {userData.name}
            <span className="ml-4">Account : {userData.accountNumber}</span>
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-white">Current miner :</p>
          <p className="text-white">Free Miner</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleBuyMinerClick}
            className="flex-1 bg-black text-white font-bold py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            BUY MINER
          </button>
          <button
            onClick={handleFaqClick}
            className="bg-black text-white p-3 rounded-md hover:bg-gray-900 transition-colors"
            title="Frequently Asked Questions"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-4 mb-8">
        <button
          onClick={handleMineClick}
          className="w-full bg-green-500 text-white font-bold py-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <div className="bg-white p-2 rounded-md mr-3">
            <CreditCard className="h-6 w-6 text-gray-800" />
          </div>
          <span className="text-xl">Mine</span>
        </button>

        <button
          onClick={handleWithdrawClick}
          className="w-full bg-green-500 text-white font-bold py-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
          disabled={balance < 86000}
        >
          <div className="bg-white p-2 rounded-md mr-3">
            <Send className="h-6 w-6 text-gray-800" />
          </div>
          <span className="text-xl">Withdraw</span>
        </button>
      </div>

      {/* Bank Logo */}
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
          <path d="M50 10 L90 40 L90 90 L10 90 L10 40 Z" fill="currentColor" />
          <rect x="25" y="45" width="10" height="35" fill="black" />
          <rect x="45" y="45" width="10" height="35" fill="black" />
          <rect x="65" y="45" width="10" height="35" fill="black" />
          <rect x="15" y="80" width="70" height="5" fill="black" />
          <path d="M50 20 L80 40 L20 40 Z" fill="black" />
        </svg>
      </div>

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <span role="img" aria-label="treasure" className="text-2xl">
                  🏆
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Welcome new user</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Hello dear user your current plan is set on free miner so you can only mine NGN86,000.00 daily are you
              sure you want to start miner.
            </p>
            <div className="flex justify-end">
              <button onClick={handleStartMining} className="px-4 py-2 text-green-500 font-medium">
                START MINING
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mining Countdown */}
      {isMining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col items-center">
            <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Mining in progress</h2>
            <p className="text-gray-700 text-lg">Countdown: {countdown} seconds</p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <span role="img" aria-label="money" className="text-2xl">
                  💰
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Mined successfull</h2>
            </div>
            <p className="text-gray-700 mb-6">
              You have successfully mined NGN86,000.00 to your wallet now you can withdraw
            </p>
            <div className="flex justify-end">
              <button onClick={handleSuccessOk} className="px-4 py-2 text-green-500 font-medium">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Miner Not Available Popup */}
      {showMinerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Not Available</h2>
            <p className="text-gray-700 mb-6">Miner upgrade is not available at this time. Please check back later.</p>
            <div className="flex justify-end">
              <button onClick={() => setShowMinerPopup(false)} className="px-4 py-2 bg-green-500 text-white rounded-md">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
