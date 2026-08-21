// Must match data in jsonserver

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
  userLevels: UserLevel
}

export interface UserResponse {
  id: number
  firstName: string
  lastName: string
  province: string
  imageUrl: string
  username: string
  password: string
  role: string
  isActive: boolean
  userLevels: UserLevel[]
}

export interface UserState {
  user: User | null
}

export interface Level {
  id: number
  name: string
  description: string
  passCriteria: number
}

export interface UserLevel {
  id: number
  createdAt: Date
  userId: number
  levelId: number
}

export interface LevelsState {
  levels: Level[] | []
}

export interface Benefit {
  id: number
  description: string
  levelId: number
}

export interface BenefitsState {
  benefits: Benefit[] | []
}

export interface Service {
  id: number
  levelId: number
  name: string
}

export interface ServicesState {
  services: Service[] | []
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
  id: string
  name: string
  description: string
  createdAt: Date
  questions: Question[]
  levelId: number
}

export interface ExamHistory {
  id: string
  createdAt: Date
  totalScore: number
  isPassed: boolean
  examId: number
}

export interface Question {
  id: number
  questionText: string
  choices: AnswerChoice[]
  examId: number
}

export interface AnswerChoice {
  id: number
  answerText: string
  isCorrect: boolean
  questionId: number
}
