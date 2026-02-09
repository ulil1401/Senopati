'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="card text-center">
            <div className="text-5xl mb-4">📧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Terkirim!
            </h1>
            <p className="text-gray-600 mb-6">
              Kami telah mengirimkan link reset password ke email Anda. 
              Silakan cek inbox Anda.
            </p>
            <Link href="/login" className="btn-primary">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="card">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Lupa Password?
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Masukkan email Anda dan kami akan mengirimkan link untuk reset password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Kirim Link Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-primary-600 hover:underline">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
