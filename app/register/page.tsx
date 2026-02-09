'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    goal: null as 'work' | 'travel' | 'academic' | null,
    placementScore: null as number | null,
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleGoalSelect = (goal: 'work' | 'travel' | 'academic') => {
    setFormData({ ...formData, goal })
    setStep(3)
  }

  const handlePlacementTest = () => {
    // Simulasi placement test - dalam aplikasi nyata, ini akan memanggil AI
    const score = Math.floor(Math.random() * 100)
    setFormData({ ...formData, placementScore: score })
    
    // Tentukan level berdasarkan score
    let level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' = 'A1'
    if (score >= 90) level = 'C2'
    else if (score >= 80) level = 'C1'
    else if (score >= 70) level = 'B2'
    else if (score >= 60) level = 'B1'
    else if (score >= 40) level = 'A2'
    
    setUser({
      id: '1',
      email: formData.email,
      name: formData.name,
      level,
      xp: 0,
      gems: 50, // Bonus awal
      streak: 0,
      avatar: '',
      goal: formData.goal,
    })
    
    router.push('/dashboard')
  }

  if (step === 1) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="card">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Daftar Akun Baru
            </h1>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Lanjutkan
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-primary-600 font-semibold hover:underline">
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="card">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Apa Tujuan Belajarmu?
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Pilih tujuan utama untuk membantu kami menyesuaikan materi pembelajaran
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => handleGoalSelect('work')}
                className="card text-center hover:border-primary-500 border-2 border-transparent transition-all"
              >
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Untuk Kerja</h3>
                <p className="text-gray-600 text-sm">
                  Tingkatkan kemampuan bahasa Inggris untuk karir profesional
                </p>
              </button>

              <button
                onClick={() => handleGoalSelect('travel')}
                className="card text-center hover:border-primary-500 border-2 border-transparent transition-all"
              >
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Untuk Travel</h3>
                <p className="text-gray-600 text-sm">
                  Pelajari bahasa Inggris untuk perjalanan dan komunikasi sehari-hari
                </p>
              </button>

              <button
                onClick={() => handleGoalSelect('academic')}
                className="card text-center hover:border-primary-500 border-2 border-transparent transition-all"
              >
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Akademis</h3>
                <p className="text-gray-600 text-sm">
                  Persiapkan diri untuk ujian atau studi di luar negeri
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="card">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            AI Placement Test
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Tes singkat 5 menit untuk menentukan level awal belajarmu (A1 - C2)
          </p>

          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Apa yang akan diuji?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Grammar & Vocabulary</li>
              <li>• Reading Comprehension</li>
              <li>• Listening Skills</li>
            </ul>
          </div>

          <button
            onClick={handlePlacementTest}
            className="btn-primary w-full"
          >
            Mulai Placement Test
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Atau{' '}
            <button
              onClick={() => {
                setUser({
                  id: '1',
                  email: formData.email,
                  name: formData.name,
                  level: 'A1',
                  xp: 0,
                  gems: 50,
                  streak: 0,
                  avatar: '',
                  goal: formData.goal,
                })
                router.push('/dashboard')
              }}
              className="text-primary-600 font-semibold hover:underline"
            >
              lewati dan mulai dari A1
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
