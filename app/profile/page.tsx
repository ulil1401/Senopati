'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useStore, xpToLevel, xpProgressInLevel } from '@/lib/store'
import { TOPICS } from '@/lib/topics'
import { FiCheck } from 'react-icons/fi'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, completedTopicIds } = useStore()
  const levelNum = user ? xpToLevel(user.xp) : 1
  const progress = user ? xpProgressInLevel(user.xp) : { current: 0, needed: 100, percent: 0 }
  const completedTopics = TOPICS.filter((t) => completedTopicIds.includes(t.id))

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              {user.isGuest && <p className="text-amber-600 text-sm mb-2">Akun Tamu</p>}
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 font-semibold rounded-full">Level {levelNum}</span>
                <span className="text-gray-600"><strong>{user.xp}</strong> XP</span>
                {!user.isGuest && <span className="text-gray-600">💎 {user.gems} 🔥 {user.streak} hari</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Level</h2>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all" style={{ width: `${progress.percent}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress.current} / {progress.needed} XP</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FiCheck className="w-5 h-5 text-green-600 mr-2" />Topik Selesai ({completedTopics.length})</h2>
          {completedTopics.length === 0 ? (
            <p className="text-gray-600">Belum ada. <Link href="/dashboard" className="text-primary-600 hover:underline">Mulai dari Dashboard</Link>.</p>
          ) : (
            <ul className="space-y-2">
              {completedTopics.map((t) => (
                <li key={t.id} className="flex items-center text-gray-700"><FiCheck className="w-5 h-5 text-green-500 mr-2" />{t.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
