// Must match data in jsonserver

export interface MockUser {
  id: number
  firstName: string
  lastName: string
  province: string
  imageUrl: string
  username: string
  password: string
  role: string // This may changed to Role interface later.
  isActive: boolean
  levelId: string
  userLevels: UserLevel
}

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

// A row of the json-server `userLevels` collection
export interface UserLevel {
  id: number
  createdAt: Date
  userId: number
  levelId: number
}

// A level the backend sends inside a profile: { id, name }
export type Profile = User

export interface UserExamHistory {
  id: number
  createdAt: Date
  totalScore: number
  isPassed: boolean
  name: string
  description: string
  level: string
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

// Session token pair returned by the real backend
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

export interface UserBadge {
  id: number
  earnedAt: Date
  userId: string
  badgeId: string
}

export interface Course {
  id: number
  createdAt: Date
  videoUrl: string
  name: string
  description: string
  level: Level
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