'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'
import { FiMic, FiEdit3, FiBriefcase, FiHome } from 'react-icons/fi'

export default function PlaygroundPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useStore()
  const [mode, setMode] = useState<'roleplay' | 'writing' | null>(
    searchParams.get('mode') === 'writing' ? 'writing' : null
  )
  const [scenario, setScenario] = useState<string | null>(null)
  const [conversation, setConversation] = useState<Array<{ role: string; text: string }>>([])
  const [writingText, setWritingText] = useState('')
  const [corrections, setCorrections] = useState<Array<{ original: string; corrected: string; explanation: string }>>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!user) return null

  const scenarios = [
    { id: 'interview', title: 'Wawancara Kerja', icon: '💼', description: 'Latih wawancara kerja dengan AI sebagai HRD' },
    { id: 'hotel', title: 'Check-in Hotel', icon: '🏨', description: 'Praktek check-in hotel dengan resepsionis AI' },
    { id: 'restaurant', title: 'Order di Restoran', icon: '🍽️', description: 'Latih memesan makanan di restoran' },
    { id: 'airport', title: 'Bandara', icon: '✈️', description: 'Praktek komunikasi di bandara' },
  ]

  const handleStartRoleplay = (scenarioId: string) => {
    setScenario(scenarioId)
    setMode('roleplay')
    // Simulasi AI response
    const initialMessages = [
      { role: 'ai', text: scenarioId === 'interview' 
        ? "Hello! Welcome to our company. Please have a seat. Let's start with a simple question: Can you tell me a little about yourself?"
        : scenarioId === 'hotel'
        ? "Good evening! Welcome to our hotel. Do you have a reservation?"
        : "Hello! Welcome to our restaurant. How many people are in your party?"
      }
    ]
    setConversation(initialMessages)
  }

  const handleSendMessage = (text: string) => {
    setConversation([...conversation, { role: 'user', text }])
    // Simulasi AI response
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'ai',
        text: "That's interesting! Can you tell me more about that?"
      }])
    }, 1000)
  }

  const handleAnalyzeWriting = () => {
    // Simulasi AI grammar correction
    const mockCorrections = [
      {
        original: 'I go to school yesterday',
        corrected: 'I went to school yesterday',
        explanation: 'Use past tense "went" because "yesterday" indicates past time'
      },
      {
        original: 'She is very good in English',
        corrected: 'She is very good at English',
        explanation: 'Use "at" instead of "in" when talking about proficiency in a subject'
      }
    ]
    setCorrections(mockCorrections)
  }

  if (!mode) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Playground</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setMode('roleplay')}
              className="card text-left hover:border-primary-500 border-2 border-transparent transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiBriefcase className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Roleplay Scenarios</h2>
                  <p className="text-gray-600">Praktek percakapan dalam situasi nyata</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMode('writing')}
              className="card text-left hover:border-primary-500 border-2 border-transparent transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
                  <FiEdit3 className="w-8 h-8 text-accent-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Writing Assistant</h2>
                  <p className="text-gray-600">Koreksi grammar dan saran vocabulary</p>
                </div>
              </div>
            </button>
          </div>

          {mode === null && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Skenario Roleplay</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleStartRoleplay(sc.id)}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                  >
                    <div className="text-3xl mb-2">{sc.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{sc.title}</h3>
                    <p className="text-sm text-gray-600">{sc.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (mode === 'roleplay' && scenario) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => {
                setMode(null)
                setScenario(null)
                setConversation([])
              }}
              className="text-primary-600 hover:underline"
            >
              ← Kembali
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              {scenarios.find(s => s.id === scenario)?.title}
            </h1>
          </div>

          <div className="card">
            <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        msg.role === 'user' ? 'bg-primary-500' : 'bg-accent-500'
                      }`}
                    >
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div
                      className={`flex-1 p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary-100 text-primary-900'
                          : 'bg-white border-2 border-gray-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Ketik pesanmu..."
                className="input-field flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    handleSendMessage(e.currentTarget.value)
                    e.currentTarget.value = ''
                  }
                }}
              />
              <button className="btn-primary">
                <FiMic className="w-5 h-5" />
              </button>
              <button className="btn-primary">Kirim</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Writing Assistant Mode
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setMode(null)
              setWritingText('')
              setCorrections([])
            }}
            className="text-primary-600 hover:underline"
          >
            ← Kembali
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Writing Assistant</h1>
        </div>

        <div className="card mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tulis esai atau paragrafmu di sini:
          </label>
          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            className="input-field min-h-[300px]"
            placeholder="Contoh: I go to school yesterday. She is very good in English..."
          />
          <button
            onClick={handleAnalyzeWriting}
            className="btn-primary mt-4"
            disabled={!writingText.trim()}
          >
            Analisis dengan AI
          </button>
        </div>

        {corrections.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Koreksi & Saran AI</h2>
            <div className="space-y-4">
              {corrections.map((correction, index) => (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Original:</strong> <span className="line-through">{correction.original}</span>
                  </p>
                  <p className="text-sm text-gray-900 mb-2">
                    <strong>Corrected:</strong> {correction.corrected}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Penjelasan:</strong> {correction.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
