'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useStore()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({
      id: '1',
      email: formData.email,
      name: 'User Demo',
      level: 'B1',
      xp: 1250,
      gems: 150,
      streak: 5,
      avatar: '',
      goal: 'work',
    })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="card">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Masuk ke Akunmu</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">Lupa Password?</Link>
            </div>
            <button type="submit" className="btn-primary w-full">Masuk</button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Belum punya akun? <Link href="/register" className="text-primary-600 font-semibold hover:underline">Daftar Sekarang</Link>
          </p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-3">atau</p>
            <button
              type="button"
              onClick={() => { useStore.getState().setGuest(); router.push('/dashboard') }}
              className="w-full py-3 px-4 border-2 border-dashed border-primary-300 rounded-lg text-primary-700 font-medium hover:bg-primary-50"
            >
              Login as Guest
            </button>
            <p className="mt-2 text-center text-xs text-gray-500">Progress tidak disimpan permanen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
