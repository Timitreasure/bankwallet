"use client"

import type React from "react"

import { useState } from "react"

interface LoginFormProps {
  onSubmit: (data: {
    phone: string
    name: string
    accountNumber: string
  }) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ phone, name, accountNumber })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 11) {
      setPhone(value)
    }
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 10) {
      setAccountNumber(value)
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="mb-6 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
            <path d="M50 10 L90 40 L90 90 L10 90 L10 40 Z" fill="currentColor" />
            <rect x="25" y="45" width="10" height="35" fill="black" />
            <rect x="45" y="45" width="10" height="35" fill="black" />
            <rect x="65" y="45" width="10" height="35" fill="black" />
            <rect x="15" y="80" width="70" height="5" fill="black" />
            <path d="M50 20 L80 40 L20 40 Z" fill="black" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-500">Bank Wallet</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone number"
            className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            maxLength={11}
            pattern="[0-9]{11}"
            title="Phone number must be 11 digits"
          />
          <div className="text-xs text-gray-400 mt-1 text-right">{phone.length}/11</div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Account Name"
            className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="relative">
          <input
            type="text"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            placeholder="Account number"
            className="w-full px-4 py-3 bg-black border border-green-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            maxLength={10}
            pattern="[0-9]{10}"
            title="Account number must be 10 digits"
          />
          <div className="text-xs text-gray-400 mt-1 text-right">{accountNumber.length}/10</div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-black font-bold py-4 rounded-md hover:bg-green-600 transition-colors"
        >
          START EARNING
        </button>
      </form>
    </div>
  )
}
