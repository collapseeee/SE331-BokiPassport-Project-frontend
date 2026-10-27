
export interface User {
  id: number
  firstName: string
  lastName: string
  province: string
  image: string
  username: string
  isActive: boolean
  roles: string[]
  badges: Badge[]
  levels: Level[]
}

export interface Profile {
  id: number
  firstName: string
  lastName: string
  province: string
  image: string
  username: string
  roles: string[]
  badges: Badge[]
  levels: Level[]
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
}

export interface Level {
  id: number
  name: string
  description: string
  passCriteria: number
}

export interface LevelsState {
  levels: Level[] | []
}

export interface Benefit {
  id: number
  description: string
  level: Level
}

export interface BenefitsState {
  benefits: Benefit[] | []
}

export interface Service {
  id: number
  level: Level
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
  level: Level
}

export interface CourseRequest {
  name: string
  description: string
  videoUrl: string
  level: { id: number }
}

export interface CourseStates {
  courses: Course[] | null
}

export interface Exam {
  id: number
  name: string
  description: string
  level: Level
  questionCount: number
}

export interface ExamState {
  exam: Exam | null
}

export interface ExamHistory {
  id: string
  createdAt: Date
  totalScore: number
  isPassed: boolean
  name: string
  description: string
  level: string
}

export interface Question {
  id: number
  questionText: string
  answerChoices: AnswerChoice[]
}

export interface QuestionsState {
  questions: Question[] | []
}

export interface AnswerChoice {
  id: number
  answerText: string
  isCorrect?: boolean
}

export interface DashboardItem {
  key: string
  value: number
}

export interface UserSearchOption {
  name: string
  province: string
  level: string
}

export interface ExamSubmitResponse {
  examId: number
  totalScore: number
  maxScore: number
  isPassed: boolean
  awardedLevelId: number | null
}