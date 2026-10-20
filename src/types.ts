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
  levelId: string
  userLevels: UserLevel
}

export interface User {
  id: number
  firstName: string
  lastName: string
  province: string
  image: string
  userExamHistories: UserExamHistory[]
  badges: Badge[]
  levels: LevelSummary[]
  roles: string[]
}

// A row of the json-server `userLevels` collection
export interface UserLevel {
  id: number
  createdAt: Date
  userId: number
  levelId: number
}

// A level the backend sends inside a profile: { id, name }
export interface LevelSummary {
  id: number
  name: string
}

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

// The backend's UserAuthDTO — the profile in the register and the authenticate
// response: { id, firstName, lastName, province, username, image, roles }
// TODO(backend): UserAuthDTO has no `levels`, so a returning user's level is
// unknown to the frontend — ask the backend to add them (UserOwnLevelDTO).
export interface Profile {
  id: number
  firstName: string
  lastName: string
  province: string
  image: string
  username: string
  roles: string[]
  levels?: LevelSummary[]
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
  levelId: number
}

export interface CourseStates {
  courses: Course[] | null
}

export interface Exam {
  id: string
  name: string
  description: string
  levelId: number
  questions: Question[]
}

export interface ExamState {
  exam: Exam | null
}

export interface ExamHistory {
  id: string
  createdAt: Date
  totalScore: number
  isPassed: boolean
  examId: number
  userId: number
}

export interface Question {
  id: number
  questionText: string
  examId: number
  answerChoices: AnswerChoice[]
}

export interface QuestionsState {
  questions: Question[] | []
}

export interface AnswerChoice {
  id: number
  answerText: string
  isCorrect: boolean
  questionId: number
}

export interface DashboardItem {
  key: string
  value: number
}
