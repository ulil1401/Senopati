'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useStore, xpToLevel, xpProgressInLevel } from '@/lib/store'
import { getTopicsByLevel } from '@/lib/topics'
import { FiFlame, FiTrendingUp, FiAward, FiLock, FiCheck } from 'react-icons/fi'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, completedTopicIds, updateStreak } = useStore()
  const topics = getTopicsByLevel('beginner')
  const levelNum = user ? xpToLevel(user.xp) : 1
  const progress = user ? xpProgressInLevel(user.xp) : { current: 0, needed: 100, percent: 0 }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    updateStreak()
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastLogin', new Date().toDateString())
    }
  }, [isAuthenticated, router, updateStreak])

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.isGuest && (
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-center justify-between flex-wrap gap-2">
            <p className="text-amber-800 font-medium">Anda masuk sebagai <strong>Tamu</strong>. Progress tidak disimpan permanen.</p>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">Daftar untuk menyimpan progress</Link>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, {user.name}! 👋</h1>
          <div className="flex flex-wrap items-center gap-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 font-semibold rounded-full">Level {levelNum}</span>
            <span className="font-bold text-gray-900">{user.xp.toLocaleString()} XP</span>
            {!user.isGuest && (
              <>
                <span className="flex items-center gap-1"><FiFlame className="w-5 h-5 text-orange-500" /> Streak: {user.streak} hari</span>
                <span className="font-bold text-accent-600">💎 {user.gems}</span>
              </>
            )}
          </div>
        </div>
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Progress Level</h2>
            <span className="text-sm text-gray-600">{progress.current}/{progress.needed} XP menuju Level {levelNum + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Beginner</h2>
          <p className="text-gray-600 mb-6">Selesaikan topik untuk mendapat XP.</p>
          <div className="space-y-4">
            {topics.map((topic, index) => {
              const completed = completedTopicIds.includes(topic.id)
              const locked = false
              return (
                <Link
                  key={topic.id}
                  href={locked ? '#' : `/lesson/${topic.id}`}
                  className={`block p-4 rounded-lg border-2 transition-all ${
                    completed ? 'bg-green-50 border-green-300 hover:border-green-400'
                      : locked ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                      : 'bg-white border-primary-300 hover:border-primary-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        completed ? 'bg-green-500 text-white' : locked ? 'bg-gray-400 text-white' : 'bg-primary-500 text-white'
                      }`}>
                        {completed ? <FiCheck className="w-5 h-5" /> : index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                        {completed && <p className="text-sm text-green-600">✓ Selesai • +{topic.xpReward} XP</p>}
                        {locked && <p className="text-sm text-gray-500 flex items-center gap-1"><FiLock className="w-4 h-4" /> Terkunci</p>}
                      </div>
                    </div>
                    {!locked && <FiTrendingUp className="w-5 h-5 text-primary-600" />}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FiAward className="w-6 h-6 text-primary-600 mr-2" /> Rekomendasi</h2>
          {topics.some((t) => !completedTopicIds.includes(t.id)) ? (
            <p className="text-gray-700">Lanjutkan dengan: <strong>{topics.find((t) => !completedTopicIds.includes(t.id))?.title ?? '—'}</strong></p>
          ) : (
            <p className="text-gray-700">Selamat! Semua topik Beginner selesai.</p>
          )}
        </div>
      </div>
    </div>
  )
}
