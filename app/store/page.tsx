'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'
import { FiShoppingBag, FiGift, FiStar, FiZap } from 'react-icons/fi'

export default function StorePage() {
  const router = useRouter()
  const { user, isAuthenticated, addGems } = useStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!user) return null

  const powerUps = [
    {
      id: 'streak-freeze',
      name: 'Streak Freeze',
      description: 'Agar streak tidak hilang jika absen sehari',
      price: 50,
      icon: '❄️',
      category: 'powerup',
    },
    {
      id: 'double-xp',
      name: 'Double XP (1 hari)',
      description: 'Dapatkan 2x XP untuk semua aktivitas',
      price: 75,
      icon: '⚡',
      category: 'powerup',
    },
    {
      id: 'hint-pack',
      name: 'Hint Pack',
      description: '5 hint untuk membantu menjawab soal',
      price: 30,
      icon: '💡',
      category: 'powerup',
    },
  ]

  const avatars = [
    {
      id: 'avatar-1',
      name: 'Cool Glasses',
      description: 'Kacamata keren untuk avatar',
      price: 100,
      icon: '😎',
      category: 'avatar',
    },
    {
      id: 'avatar-2',
      name: 'Crown',
      description: 'Mahkota eksklusif',
      price: 200,
      icon: '👑',
      category: 'avatar',
    },
    {
      id: 'avatar-3',
      name: 'Superhero Cape',
      description: 'Jubah superhero',
      price: 150,
      icon: '🦸',
      category: 'avatar',
    },
  ]

  const bonusLessons = [
    {
      id: 'idiom-slang',
      name: 'Idiom & Slang',
      description: 'Pelajari idiom dan slang bahasa Inggris populer',
      price: 120,
      icon: '🗣️',
      category: 'lesson',
    },
    {
      id: 'business-flirting',
      name: 'Business Flirting',
      description: 'Cara berkomunikasi profesional yang menarik',
      price: 150,
      icon: '💼',
      category: 'lesson',
    },
    {
      id: 'academic-writing',
      name: 'Academic Writing',
      description: 'Teknik menulis esai akademis yang baik',
      price: 180,
      icon: '📝',
      category: 'lesson',
    },
  ]

  const handlePurchase = (item: any) => {
    if (user.gems >= item.price) {
      addGems(-item.price)
      alert(`Berhasil membeli ${item.name}!`)
    } else {
      alert('Gems tidak cukup! Selesaikan lebih banyak pelajaran untuk mendapatkan gems.')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reward Store</h1>
            <p className="text-gray-600">Tukar gems untuk power-ups, avatar, dan bonus lessons</p>
          </div>
          <div className="bg-gradient-to-r from-accent-500 to-primary-500 text-white rounded-lg px-6 py-4">
            <p className="text-sm opacity-90">Gems Kamu</p>
            <p className="text-3xl font-bold">💎 {user.gems}</p>
          </div>
        </div>

        {/* Power-ups */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FiZap className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Power-ups</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {powerUps.map((item) => (
              <div key={item.id} className="card">
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-600">💎 {item.price}</span>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={user.gems < item.price}
                    className={`btn-primary ${
                      user.gems < item.price
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Beli
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Customization */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FiStar className="w-6 h-6 text-accent-600" />
            <h2 className="text-2xl font-bold text-gray-900">Avatar Customization</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {avatars.map((item) => (
              <div key={item.id} className="card">
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-600">💎 {item.price}</span>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={user.gems < item.price}
                    className={`btn-primary ${
                      user.gems < item.price
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Beli
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Lessons */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <FiGift className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Bonus Lessons</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bonusLessons.map((item) => (
              <div key={item.id} className="card">
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-600">💎 {item.price}</span>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={user.gems < item.price}
                    className={`btn-primary ${
                      user.gems < item.price
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Beli
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
