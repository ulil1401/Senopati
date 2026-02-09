'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useStore } from '@/lib/store'
import { getTopicById, type QuizQuestion } from '@/lib/topics'
import { FiCheck, FiX } from 'react-icons/fi'

function renderMaterial(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    return <span key={i}>{part}</span>
  })
}

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const topicId = params.id as string
  const topic = getTopicById(topicId)
  const { user, isAuthenticated, completeTopic } = useStore()

  const [step, setStep] = useState<'material' | 'quiz'>('material')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [shortAnswer, setShortAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [aiFeedback, setAiFeedback] = useState('')
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])
  useEffect(() => {
    if (!topic) router.push('/dashboard')
  }, [topic, router])

  if (!user || !topic) return null

  const questions = topic.questions
  const currentQuestion: QuizQuestion | undefined = questions[questionIndex]
  const isLastQuestion = questionIndex >= questions.length - 1

  const submitAnswer = async () => {
    const answer = currentQuestion?.type === 'short' ? shortAnswer.trim().toLowerCase() : selectedAnswer
    const correctNorm = currentQuestion?.correctAnswer?.trim().toLowerCase() ?? ''
    const correct = currentQuestion
      ? (currentQuestion.type === 'short' ? answer === correctNorm : answer === currentQuestion.correctAnswer)
      : false
    setIsCorrect(correct)
    setShowResult(true)
    setLoadingFeedback(true)
    try {
      const res = await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicTitle: topic.title, question: currentQuestion?.question, userAnswer: answer, correctAnswer: currentQuestion?.correctAnswer, isCorrect: correct }),
      })
      const data = await res.json()
      setAiFeedback(data.feedback || '')
    } catch {
      setAiFeedback(correct ? 'Bagus!' : `Jawaban benar: ${currentQuestion?.correctAnswer}`)
    }
    setLoadingFeedback(false)
  }

  const goNext = () => {
    if (isLastQuestion) {
      completeTopic(topic.id, topic.xpReward)
      setXpEarned(topic.xpReward)
      setCompleted(true)
    } else {
      setQuestionIndex((i) => i + 1)
      setSelectedAnswer('')
      setShortAnswer('')
      setShowResult(false)
      setAiFeedback('')
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="card text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Topik Selesai!</h1>
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold">+{xpEarned} XP</p>
            </div>
            <Link href="/dashboard" className="btn-primary inline-block">Kembali ke Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'material') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/dashboard" className="text-primary-600 hover:underline">← Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{topic.title}</h1>
          <div className="card mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Materi</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {topic.material.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{renderMaterial(line)}</p>
              ))}
            </div>
            <button onClick={() => setStep('quiz')} className="btn-primary mt-8">Mulai Kuis →</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-primary-600 hover:underline">← Dashboard</Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{topic.title}</h1>
        <p className="text-gray-600 mt-1">Soal {questionIndex + 1} dari {questions.length}</p>
        <div className="card mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion?.question}</h2>
          {currentQuestion?.type === 'mcq' && currentQuestion.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              disabled={showResult}
              onClick={() => setSelectedAnswer(opt)}
              className={`w-full p-4 text-left rounded-lg border-2 mb-3 transition-all ${
                showResult ? (opt === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' : selectedAnswer === opt ? 'border-red-500 bg-red-50' : 'border-gray-200') : selectedAnswer === opt ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'
              }`}
            >
              {opt}
            </button>
          ))}
          {currentQuestion?.type === 'short' && (
            <input
              type="text"
              className="input-field max-w-md"
              placeholder="Jawaban..."
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              disabled={showResult}
            />
          )}
          {!showResult && (
            <button
              onClick={submitAnswer}
              disabled={currentQuestion?.type === 'mcq' ? !selectedAnswer : !shortAnswer.trim()}
              className="btn-primary mt-6"
            >
              Cek Jawaban
            </button>
          )}
          {showResult && (
            <>
              <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? <FiCheck className="w-6 h-6" /> : <FiX className="w-6 h-6" />}
                <span>{isCorrect ? 'Benar!' : `Jawaban benar: ${currentQuestion?.correctAnswer}`}</span>
              </div>
              {aiFeedback && <div className="mt-4 p-4 bg-primary-50 border-l-4 border-primary-500 rounded">{aiFeedback}</div>}
              <button onClick={goNext} className="btn-primary mt-6">{isLastQuestion ? 'Selesai & Dapat XP' : 'Soal Berikutnya →'}</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
