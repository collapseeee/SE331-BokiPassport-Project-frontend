import type { User } from "@/types"
import { apiClient } from "./ApiClient"

export interface RegisterRequest {
    firstName: string
    lastName: string
    province: string
    username: string
    password: string
    image: string
}

export interface RegisterResponse {
    accessToken: string
    refreshToken: string
    profile: Profile
}

interface Profile {
    id: number
    firstName: string
    lastName: string
    province: string
    image: string
}

export interface AuthenticateRequest {
    username: string
    password: string
}

export interface AuthenticateResponse {
    accessToken: string
    refreshToken: string
    profile: User
}

export default {
    register(request: RegisterRequest) {
        return apiClient.post('/v1/auth/register', request)
    },
    authenticate(request: AuthenticateRequest) {
        return apiClient.post('/v1/auth/authenticate', request)
    }
}