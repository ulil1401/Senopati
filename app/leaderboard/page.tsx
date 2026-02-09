'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'
import { FiAward, FiStar } from 'react-icons/fi'

export default function LeaderboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { user, isAuthenticated } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted || !user) return null

  const leaderboard = [
    { rank: 1, name: 'Alex Johnson', xp: 3250, league: 'Gold', avatar: '' },
    { rank: 2, name: 'Sarah Williams', xp: 2980, league: 'Gold', avatar: '' },
    { rank: 3, name: 'Mike Chen', xp: 2750, league: 'Gold', avatar: '' },
    { rank: 4, name: 'Emma Davis', xp: 2450, league: 'Silver', avatar: '' },
    { rank: 5, name: user.name, xp: user.xp, league: 'Silver', avatar: '', isYou: true },
    { rank: 6, name: 'David Lee', xp: 2100, league: 'Silver', avatar: '' },
    { rank: 7, name: 'Lisa Brown', xp: 1950, league: 'Silver', avatar: '' },
    { rank: 8, name: 'Tom Wilson', xp: 1800, league: 'Bronze', avatar: '' },
    { rank: 9, name: 'Anna Martinez', xp: 1650, league: 'Bronze', avatar: '' },
    { rank: 10, name: 'Chris Taylor', xp: 1500, league: 'Bronze', avatar: '' },
  ]

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FiAward className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <FiStar className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <FiAward className="w-6 h-6 text-orange-500" />
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600 mb-8">Peringkat mingguan berdasarkan XP</p>

        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="text-center pt-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FiStar className="w-10 h-10 text-gray-400" />
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-bold text-gray-900">{leaderboard[1].name}</p>
              <p className="text-2xl font-bold text-gray-700">{leaderboard[1].xp} XP</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FiAward className="w-12 h-12 text-yellow-600" />
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 border-2 border-yellow-300">
              <p className="font-bold text-gray-900">{leaderboard[0].name}</p>
              <p className="text-3xl font-bold text-yellow-700">{leaderboard[0].xp} XP</p>
            </div>
          </div>
          <div className="text-center pt-12">
            <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FiAward className="w-10 h-10 text-orange-500" />
            </div>
            <div className="bg-orange-100 rounded-lg p-4">
              <p className="font-bold text-gray-900">{leaderboard[2].name}</p>
              <p className="text-2xl font-bold text-orange-700">{leaderboard[2].xp} XP</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Peringkat Lengkap</h2>
            <div className="flex space-x-2">
              <button type="button" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold">Mingguan</button>
              <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Bulanan</button>
              <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">All Time</button>
            </div>
          </div>
          <div className="space-y-3">
            {leaderboard.map((person) => (
              <div
                key={person.rank}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${person.isYou ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(person.rank) || <span className="text-lg font-bold text-gray-500">#{person.rank}</span>}
                  </div>
                  <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-700">{person.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{person.isYou ? `${person.name} (Kamu)` : person.name}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold border ${getLeagueColor(person.league)}`}>{person.league}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{person.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card border-2 border-yellow-300">
            <div className="flex items-center space-x-3 mb-3">
              <FiAward className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-900">Gold League</h3>
            </div>
            <p className="text-gray-600 text-sm">Top 3 pengguna dengan XP tertinggi.</p>
          </div>
          <div className="card border-2 border-gray-300">
            <div className="flex items-center space-x-3 mb-3">
              <FiStar className="w-6 h-6 text-gray-500" />
              <h3 className="text-lg font-bold text-gray-900">Silver League</h3>
            </div>
            <p className="text-gray-600 text-sm">Peringkat 4-7.</p>
          </div>
          <div className="card border-2 border-orange-300">
            <div className="flex items-center space-x-3 mb-3">
              <FiAward className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Bronze League</h3>
            </div>
            <p className="text-gray-600 text-sm">Peringkat 8-10.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
