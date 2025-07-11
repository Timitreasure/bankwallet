"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqPage() {
  const router = useRouter()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqItems: FaqItem[] = [
    {
      question: "What is Bank Wallet?",
      answer:
        "Bank Wallet is a digital platform that allows users to mine cryptocurrency and withdraw earnings directly to their bank accounts. It provides a simple and user-friendly way to earn passive income.",
    },
    {
      question: "How does mining work?",
      answer:
        "Mining is a process where your device contributes computing power to validate transactions on a blockchain network. With Bank Wallet, you simply click the 'Mine' button and our system handles the technical aspects for you. The Free Miner allows you to mine ₦86,000 daily.",
    },
    {
      question: "How often can I withdraw?",
      answer:
        "You can withdraw your earnings anytime as long as you have the minimum withdrawal amount of ₦86,000 in your wallet. Withdrawals are typically processed within 24-48 hours.",
    },
    {
      question: "What is a withdrawal activation code?",
      answer:
        "A withdrawal activation code is a unique PIN that authorizes your withdrawal. For security reasons, each user needs their own activation code to prevent fraud. You can purchase this code for a one-time fee of ₦5,000.",
    },
    {
      question: "How do I upgrade my miner?",
      answer:
        "Miner upgrades will be available soon! Premium miners will allow you to mine larger amounts daily. Stay tuned for announcements about miner upgrade options.",
    },
    {
      question: "Is Bank Wallet secure?",
      answer:
        "Yes! We implement industry-standard security protocols to protect your data and transactions. Each account is protected with unique activation codes and all transactions are encrypted.",
    },
    {
      question: "What banks are supported for withdrawals?",
      answer:
        "Bank Wallet supports all major Nigerian banks including Access Bank, GTBank, Zenith Bank, First Bank, UBA, and many more. We have over 100 banks in our system for your convenience.",
    },
    {
      question: "How do I contact support?",
      answer:
        "For any inquiries or assistance, please contact our support team on Telegram at @OfficialBankwallet. Our support team is available 24/7 to assist you with any questions or issues you might have.",
    },
    {
      question: "Can I have multiple accounts?",
      answer:
        "No, each user is allowed only one account. Multiple accounts from the same user may result in account suspension. This policy helps us maintain platform integrity and provide fair service to all users.",
    },
    {
      question: "What happens if my withdrawal fails?",
      answer:
        "If your withdrawal fails, the funds will be returned to your wallet balance automatically. You can then attempt the withdrawal again. If issues persist, please contact our support team for assistance.",
    },
  ]

  const toggleItem = (index: number) => {
    if (openItem === index) {
      setOpenItem(null)
    } else {
      setOpenItem(index)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={() => router.push("/")} className="text-white mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-3 mb-8">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-green-500 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center p-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-left">{item.question}</span>
                {openItem === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openItem === index && (
                <div className="p-4 bg-gray-800 text-gray-300 text-sm">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-green-500 p-4 rounded-lg mb-6">
          <h2 className="text-white font-bold mb-2">Still have questions?</h2>
          <p className="text-white text-sm mb-4">
            Our support team is available 24/7 to help you with any questions or issues you might have.
          </p>
          <a
            href="https://t.me/OfficialBankwallet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-blue-400">
              <path
                d="M21.8,5.4c-0.3-1.4-1.5-2.5-2.9-2.8C17.1,2,12,2,12,2S6.9,2,5.1,2.5C3.6,2.9,2.5,4,2.1,5.4C1.6,7.2,1.6,12,1.6,12 s0,4.8,0.5,6.6c0.3,1.4,1.5,2.5,2.9,2.8C6.9,22,12,22,12,22s5.1,0,6.9-0.5c1.4-0.3,2.5-1.5,2.9-2.8c0.5-1.8,0.5-6.6,0.5-6.6 S22.3,7.2,21.8,5.4z M9.6,15.8V8.2l5.4,3.8L9.6,15.8z"
                fill="currentColor"
              />
            </svg>
            Contact Support on Telegram
          </a>
        </div>
      </div>
    </main>
  )
}
