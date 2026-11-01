import type { Profile } from "@/types"
import { apiClient } from "./apiClient"

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

export interface AuthenticateRequest {
    username: string
    password: string
}

export interface AuthenticateResponse {
    accessToken: string
    refreshToken: string
    profile: Profile
}

export default {
    register(request: RegisterRequest) {
        return apiClient.post('/v1/auth/register', request)
    },
    authenticate(request: AuthenticateRequest) {
        return apiClient.post('/v1/auth/authenticate', request)
    }
}