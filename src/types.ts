export interface User {
  id: number
  firstName: string
  lastName: string
  province: string
  imageUrl: string
  username: string
  password: string
  role: string // This may changed to Role interface later.
  isActive: boolean
  examHistory: Exam[]
  levelId: number
  badgesId: number[]
}

export interface UserState {
  user: User | null
}

export interface Level {
  id: number
  name: string
  description: string
  pass_criteria: number
}

export interface Benefit {
  id: number
  description: string
  level_id: number
}

export interface Service {
  id: number
  required_level_id: number
  name: string
}

export interface Badge {
  id: number
  name: string
  description: string
}

export interface Course {
  id: number
  createdAt: Date
  videoUrl: string
  name: string
  description: string
  levelId: number
}

export interface Exam {
  id: number
  name: string
  description: string
  createdAt: Date
  questions: Question[]
}

export interface Question {
  id: number
  text: string
  choices: AnswerChoice[]
}

export interface AnswerChoice {
  id: number
  questionId: number
  text: string
  isCorrect: boolean
}
