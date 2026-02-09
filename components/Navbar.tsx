'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { FiUser, FiLogOut, FiAward, FiPackage } from 'react-icons/fi'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { user, isAuthenticated, setUser } = useStore()

  useEffect(() => {
    useStore.persist.rehydrate()
    setMounted(true)
  }, [])

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              LinguaFlow AI
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {mounted && isAuthenticated && user ? (
              <>
                <Link href="/leaderboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FiAward className="w-5 h-5" />
                  <span className="hidden md:inline">Leaderboard</span>
                </Link>
                <Link href="/store" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FiPackage className="w-5 h-5" />
                  <span className="hidden md:inline">Store</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <FiUser className="w-5 h-5" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
