export interface QuizQuestion {
  id: string
  type: 'mcq' | 'short'
  question: string
  options?: string[]
  correctAnswer: string
}

export interface Topic {
  id: string
  title: string
  slug: string
  levelId: string
  order: number
  material: string
  questions: QuizQuestion[]
  xpReward: number
}

export interface Level {
  id: string
  name: string
  order: number
}

export const LEVELS: Level[] = [{ id: 'beginner', name: 'Beginner', order: 1 }]

export const TOPICS: Topic[] = [
  {
    id: 'simple-present',
    title: 'Simple Present Tense',
    slug: 'simple-present',
    levelId: 'beginner',
    order: 1,
    xpReward: 30,
    material: '**Simple Present** untuk kebiasaan dan fakta. Rumus: Subject + V1 (s/es untuk he/she/it). Contoh: She works at a bank.',
    questions: [
      { id: 'q1', type: 'mcq', question: 'She _____ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 'goes' },
      { id: 'q2', type: 'mcq', question: 'They _____ English on Mondays.', options: ['study', 'studies', 'studying', 'studied'], correctAnswer: 'study' },
      { id: 'q3', type: 'short', question: 'He _____ (watch) TV every evening.', correctAnswer: 'watches' },
    ],
  },
  {
    id: 'daily-greetings',
    title: 'Daily Greetings',
    slug: 'daily-greetings',
    levelId: 'beginner',
    order: 2,
    xpReward: 25,
    material: 'Greetings: Hello! How are you? — I\'m fine. Introductions: My name is ... Nice to meet you.',
    questions: [
      { id: 'q1', type: 'mcq', question: 'Respons untuk "How are you?"', options: ["I'm fine.", 'My name is John.', 'Goodbye!'], correctAnswer: "I'm fine." },
      { id: 'q2', type: 'short', question: '_____ to meet you!', correctAnswer: 'Nice' },
    ],
  },
  {
    id: 'basic-vocabulary',
    title: 'Numbers & Colors',
    slug: 'basic-vocabulary',
    levelId: 'beginner',
    order: 3,
    xpReward: 25,
    material: 'Numbers: one to twenty. Colors: red, blue, green, yellow, orange, etc.',
    questions: [
      { id: 'q1', type: 'mcq', question: 'Angka 15 = ...', options: ['fiveteen', 'fifteen', 'fifty'], correctAnswer: 'fifteen' },
      { id: 'q2', type: 'mcq', question: 'Warna jingga = ...', options: ['orange', 'red', 'yellow'], correctAnswer: 'orange' },
    ],
  },
  {
    id: 'simple-past',
    title: 'Simple Past Tense',
    slug: 'simple-past',
    levelId: 'beginner',
    order: 4,
    xpReward: 35,
    material: 'Simple Past untuk masa lampau. Subject + V2. Contoh: go→went, see→saw.',
    questions: [
      { id: 'q1', type: 'mcq', question: 'I _____ to the store yesterday.', options: ['go', 'went', 'going'], correctAnswer: 'went' },
      { id: 'q2', type: 'mcq', question: 'Past dari "see" = ...', options: ['saw', 'seen', 'see'], correctAnswer: 'saw' },
    ],
  },
  {
    id: 'articles',
    title: 'Articles: A, An, The',
    slug: 'articles',
    levelId: 'beginner',
    order: 5,
    xpReward: 30,
    material: 'A = konsonan, An = vokal, The = spesifik. Contoh: an apple, the sun.',
    questions: [
      { id: 'q1', type: 'mcq', question: 'I have _____ apple.', options: ['a', 'an', 'the'], correctAnswer: 'an' },
      { id: 'q2', type: 'mcq', question: '_____ sun is hot.', options: ['A', 'An', 'The'], correctAnswer: 'The' },
    ],
  },
]

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}

export function getTopicsByLevel(levelId: string): Topic[] {
  return TOPICS.filter((t) => t.levelId === levelId).sort((a, b) => a.order - b.order)
}
