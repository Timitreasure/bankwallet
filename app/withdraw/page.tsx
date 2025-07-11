"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingOverlay from "@/components/loading-overlay"

// Expanded list of 60+ banks
const BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Jaiz Bank",
  "Providus Bank",
  "Titan Trust Bank",
  "SunTrust Bank",
  "Globus Bank",
  "Parallex Bank",
  "Premium Trust Bank",
  "Optimus Bank",
  "Signature Bank",
  "Coronation Merchant Bank",
  "FBNQuest Merchant Bank",
  "FSDH Merchant Bank",
  "Rand Merchant Bank",
  "Nova Merchant Bank",
  "Greenwich Merchant Bank",
  "Abbey Mortgage Bank",
  "ASO Savings and Loans",
  "Haggai Mortgage Bank",
  "Infinity Trust Mortgage Bank",
  "Nigeria Mortgage Refinance Company",
  "Platinum Mortgage Bank",
  "Trustbond Mortgage Bank",
  "Jubilee Life Mortgage Bank",
  "Moniepoint MFB",
  "Kuda Bank",
  "VFD Microfinance Bank",
  "Sparkle Microfinance Bank",
  "Rubies Microfinance Bank",
  "Mint Microfinance Bank",
  "Renmoney Microfinance Bank",
  "Accion Microfinance Bank",
  "Baobab Microfinance Bank",
  "AB Microfinance Bank",
  "Lapo Microfinance Bank",
  "Finca Microfinance Bank",
  "Mutual Trust Microfinance Bank",
  "Advans La Fayette Microfinance Bank",
  "NPF Microfinance Bank",
  "Gogetit Microfinance Bank",
  "Opay",
  "Palmpay",
  "Paga",
  "Carbon",
  "Fairmoney",
  "Branch",
  "Aella Credit",
  "Rosabon Financial Services",
  "Page Financials",
  "Dot Finance",
  "Zedvance",
  "Quickcheck",
  "Kiakia",
  "Lidya",
  "Paystack",
  "Flutterwave",
  "Interswitch",
  "eTranzact",
  "Remita",
  "Cellulant",
  "Payporte",
  "Wallet Africa",
  "Quidax",
  "Busha",
  "Luno",
  "Bundle Africa",
  "Patricia",
  "Bitsika",
  "Buycoins",
  "Cowrywise",
  "PiggyVest",
  "Bamboo",
  "Risevest",
  "Trove",
  "Chaka",
  "Anchoria",
  "Afrinvest",
  "Meristem",
  "United Capital",
  "CardinalStone",
  "ARM",
  "Stanbic IBTC Asset Management",
  "FBNQuest Asset Management",
  "Lotus Capital",
  "AXA Mansard",
  "Leadway Assurance",
  "AIICO Insurance",
  "Cornerstone Insurance",
  "NEM Insurance",
  "Mutual Benefits Assurance",
  "Consolidated Hallmark Insurance",
  "Sovereign Trust Insurance",
  "Linkage Assurance",
  "Prestige Assurance",
  "Guinea Insurance",
  "Lasaco Assurance",
  "Royal Exchange",
  "Sunu Assurances",
  "Veritas Kapital Assurance",
  "Wapic Insurance",
  "Zenith Insurance",
  "Allianz Nigeria",
  "Coronation Insurance",
  "Heirs Insurance",
  "Tangerine Insurance",
  "Prudential Zenith Life Insurance",
  "FBNInsurance",
  "AIICO Life Assurance",
  "ARM Life",
  "Leadway Life Assurance",
  "Old Mutual Nigeria Life Assurance",
  "Custodian Life Assurance",
  "Enterprise Life Assurance",
  "Mutual Benefits Life Assurance",
  "African Alliance Insurance",
  "Capital Express Assurance",
  "Goldlink Insurance",
  "Great Nigeria Insurance",
  "Industrial and General Insurance",
  "International Energy Insurance",
  "Niger Insurance",
  "NSIA Insurance",
  "Regency Alliance Insurance",
  "Standard Alliance Insurance",
  "Universal Insurance",
  "Anchor Insurance",
  "Saham Unitrust Insurance",
  "Sovereign Trust Insurance",
  "Staco Insurance",
  "Sterling Assurance",
  "Unitrust Insurance",
  "Veritaskapital Assurance",
  "Zenith General Insurance",
  "Cornerstone Insurance",
  "Custodian and Allied Insurance",
  "Ensure Insurance",
  "Equity Assurance",
  "Guinea Insurance",
  "Lasaco Assurance",
  "Law Union & Rock Insurance",
  "Linkage Assurance",
  "Mansard Insurance",
  "Mutual Benefits Assurance",
  "NEM Insurance",
  "Prestige Assurance",
  "Regency Alliance Insurance",
  "Royal Exchange Assurance",
  "Sovereign Trust Insurance",
  "Standard Alliance Insurance",
  "Wapic Insurance",
  "Zenith Insurance",
]

export default function WithdrawPage() {
  const router = useRouter()
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Get user data from localStorage
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("userData")
        if (userData) {
          const { name, accountNumber } = JSON.parse(userData)
          setAccountName(name)
          setAccountNumber(accountNumber)
        }
      } catch (e) {
        console.error("Error loading user data:", e)
      }
    }
  }, [])

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 10) {
      setAccountNumber(value)
    }
  }

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBank) {
      alert("Please select a bank")
      return
    }
    setIsLoading(true)

    // Simulate loading for 6 seconds
    setTimeout(() => {
      setIsLoading(false)
      router.push("/withdraw/pin")
    }, 6000)
  }

  const selectBank = (bank: string) => {
    setSelectedBank(bank)
    setShowBankDropdown(false)
    setSearchTerm("")
  }

  const filteredBanks = BANKS.filter((bank) => bank.toLowerCase().includes(searchTerm.toLowerCase()))

  if (!isClient) {
    return <div className="text-white text-center mt-8">Loading withdraw form...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <div className="w-full max-w-md mt-8 flex flex-col items-center">
        <h1 className="text-white text-xl font-bold mb-6">Input your withdraw details</h1>

        {/* Bank Icon */}
        <div className="bg-green-500 p-4 rounded-2xl mb-8">
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <path d="M50 10 L90 40 L90 90 L10 90 L10 40 Z" fill="currentColor" />
              <rect x="25" y="45" width="10" height="35" fill="currentColor" />
              <rect x="45" y="45" width="10" height="35" fill="currentColor" />
              <rect x="65" y="45" width="10" height="35" fill="currentColor" />
              <rect x="15" y="80" width="70" height="5" fill="currentColor" />
              <path d="M50 20 L80 40 L20 40 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <form onSubmit={handleWithdraw} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Account Number"
              className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              maxLength={10}
              pattern="[0-9]{10}"
              title="Account number must be 10 digits"
            />
            <div className="text-xs text-gray-400 mt-1 text-right">{accountNumber.length}/10</div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
              className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="relative">
            <div
              onClick={() => setShowBankDropdown(!showBankDropdown)}
              className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer flex justify-between items-center"
            >
              {selectedBank || "Select Bank"}
              <span>▼</span>
            </div>
            {showBankDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-black border border-green-500 rounded-md max-h-60 overflow-y-auto">
                <div className="sticky top-0 bg-black p-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search banks..."
                    className="w-full px-3 py-2 bg-gray-800 border border-green-500 rounded-md text-white focus:outline-none"
                  />
                </div>
                {filteredBanks.map((bank) => (
                  <div
                    key={bank}
                    onClick={() => selectBank(bank)}
                    className="px-4 py-2 hover:bg-green-800 cursor-pointer text-white"
                  >
                    {bank}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value="86,000"
              readOnly
              className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded-md text-white focus:outline-none cursor-not-allowed"
            />
            <div className="text-xs text-gray-400 mt-1">Fixed withdrawal amount</div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-bold py-4 rounded-md hover:bg-green-600 transition-colors"
          >
            WITHDRAW
          </button>
        </form>
      </div>

      {isLoading && <LoadingOverlay />}
    </main>
  )
}
