import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { correctAnswer, isCorrect } = body as { correctAnswer?: string; isCorrect?: boolean }
    const openaiKey = process.env.OPENAI_API_KEY
    if (openaiKey) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an English tutor. Reply in Indonesian. One short sentence.' },
            { role: 'user', content: `Student correct: ${isCorrect}. Correct answer: ${correctAnswer}. Give brief feedback.` },
          ],
          max_tokens: 80,
        }),
      })
      const data = await res.json()
      const text = data.choices?.[0]?.message?.content?.trim()
      if (text) return NextResponse.json({ feedback: text })
    }
  } catch {
    // fallback
  }
  const mock = body?.isCorrect
    ? 'Bagus! Jawaban kamu benar.'
    : `Jawaban yang benar: "${body?.correctAnswer ?? ''}". Coba pelajari lagi.`
  return NextResponse.json({ feedback: mock })
}
