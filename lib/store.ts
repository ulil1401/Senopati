import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const XP_PER_LEVEL = 100
export const MAX_LEVEL = 10

export function xpToLevel(xp: number): number {
  return Math.min(MAX_LEVEL, Math.floor(xp / XP_PER_LEVEL) + 1)
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; percent: number } {
  const xpInLevel = xp % XP_PER_LEVEL
  return {
    current: xpInLevel,
    needed: XP_PER_LEVEL,
    percent: (xpInLevel / XP_PER_LEVEL) * 100,
  }
}

export interface User {
  id: string
  email: string
  name: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  xp: number
  gems: number
  streak: number
  avatar: string
  goal: 'work' | 'travel' | 'academic' | null
  isGuest?: boolean
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  completedTopicIds: string[]
  setUser: (user: User | null) => void
  setGuest: () => void
  addXP: (amount: number) => void
  addGems: (amount: number) => void
  completeTopic: (topicId: string, xpEarned: number) => void
  updateStreak: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      completedTopicIds: [],

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          completedTopicIds: user ? [] : [],
        }),

      setGuest: () =>
        set({
          user: {
            id: 'guest',
            email: '',
            name: 'Guest',
            level: 'A1',
            xp: 0,
            gems: 0,
            streak: 0,
            avatar: '',
            goal: null,
            isGuest: true,
          },
          isAuthenticated: true,
          completedTopicIds: [],
        }),

      addXP: (amount) =>
        set((state) => ({
          user: state.user ? { ...state.user, xp: state.user.xp + amount } : null,
        })),

      addGems: (amount) =>
        set((state) => ({
          user: state.user ? { ...state.user, gems: state.user.gems + amount } : null,
        })),

      completeTopic: (topicId, xpEarned) =>
        set((state) => {
          const already = state.completedTopicIds.includes(topicId)
          return {
            completedTopicIds: already
              ? state.completedTopicIds
              : [...state.completedTopicIds, topicId],
            user: state.user
              ? { ...state.user, xp: state.user.xp + (already ? 0 : xpEarned) }
              : null,
          }
        }),

      updateStreak: () =>
        set((state) => {
          if (!state.user) return state
          const lastLogin =
            typeof window !== 'undefined' ? localStorage.getItem('lastLogin') : null
          const today = new Date().toDateString()
          if (lastLogin !== today && typeof window !== 'undefined') {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const isConsecutive = lastLogin === yesterday.toDateString()
            return {
              user: {
                ...state.user,
                streak: isConsecutive ? state.user.streak + 1 : 1,
              },
            }
          }
          return state
        }),
    }),
    {
      name: 'linguaflow-storage',
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        completedTopicIds: s.completedTopicIds,
      }),
      skipHydration: true,
    }
  )
)
