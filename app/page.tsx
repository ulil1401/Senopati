import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { FiStar, FiUsers, FiZap } from 'react-icons/fi'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master English with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Platform pembelajaran Bahasa Inggris berbasis AI: materi berbasis level, kuis, feedback AI, dan sistem reward (XP & level).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg">Daftar Gratis</Link>
            <Link href="/login" className="btn-secondary text-lg">Masuk</Link>
            <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium text-lg border border-gray-300 rounded-lg py-3 px-6 hover:border-primary-400 transition-colors">
              Coba sebagai Guest
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-500">Guest: coba tanpa daftar. Progress tidak disimpan permanen.</p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200">
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4">
                <FiZap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Belajar dengan AI Tutor</h3>
              <p className="text-gray-600 mb-6">Materi level Beginner, kuis interaktif, dan feedback dari AI. Daftar atau coba sebagai Guest.</p>
              <Link href="/login" className="btn-primary">Mulai Belajar</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiZap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Learning Assistant</h3>
              <p className="text-gray-600">Penjelasan materi dan feedback langsung atas jawaban dari AI.</p>
            </div>
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                <FiStar className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Topik Berbasis Level</h3>
              <p className="text-gray-600">Beginner → Advanced. Selesaikan topik untuk dapat XP dan naik level.</p>
            </div>
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiUsers className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reward & Gamifikasi</h3>
              <p className="text-gray-600">XP, progress bar, level. Login atau Guest untuk fleksibilitas belajar.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2026 LinguaFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
