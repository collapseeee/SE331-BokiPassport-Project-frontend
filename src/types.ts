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

export interface Level {
    id: number
    name: string
    description: string
    passCriteria: number
    maxScore: number
}

export interface Benefit {
    id: number
    description: string
    level: number
}

export interface Service {
    id: number
    requiredLevelId: number
    name: string
    badgeList: Badge[]
    description: string
}

export interface Badge {
    id: number
    name: string
    description: string
}

export interface Course {
    id: number
    name: string
    description: string
    videoUrl: string
    createdAt: Date
    serviceId: number
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