'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { FiMic, FiVolume2 } from 'react-icons/fi'

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleStartDemo = () => {
    setIsRecording(true)
    setTimeout(() => {
      setTranscript('Hello, nice to meet you!')
      setAiResponse('Hello! Nice to meet you too! How are you doing today?')
      setIsRecording(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coba Demo AI Conversation
          </h1>
          <p className="text-xl text-gray-600">
            Lihat bagaimana AI Conversation Partner bekerja
          </p>
        </div>

        <div className="card">
          <div className="bg-gray-50 rounded-lg p-8 mb-6 min-h-[300px]">
            {!transcript && !aiResponse ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-6">
                  Klik tombol di bawah untuk memulai demo percakapan
                </p>
                <button
                  onClick={handleStartDemo}
                  className="btn-primary"
                  disabled={isRecording}
                >
                  {isRecording ? 'Merekam...' : 'Mulai Demo'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{transcript}</p>
                    <p className="text-sm text-green-600 mt-1">
                      Pronunciation Score: 92%
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{aiResponse}</p>
                    <button className="mt-2 flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                      <FiVolume2 className="w-4 h-4" />
                      <span className="text-sm">Dengarkan pengucapan</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Fitur yang Ditampilkan:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Speech Recognition real-time</li>
              <li>✓ AI Response yang kontekstual</li>
              <li>✓ Pronunciation Scoring</li>
              <li>✓ Audio playback untuk pengucapan</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/register" className="btn-primary">
              Daftar untuk Menggunakan Fitur Lengkap
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
