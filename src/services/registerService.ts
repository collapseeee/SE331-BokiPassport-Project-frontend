import { apiClient } from './apiClient'

export interface RegisterRequest {
  firstname: string
  lastname: string
  username: string
  password: string
  province: string
  image?: string
}

export interface AuthenticateRequest {
  username: string
  password: string
}

export interface AuthenticateResponse {
  token: string
}

const register = async (payload: RegisterRequest) => {
  return apiClient.post('/api/v1/auth/register', payload)
}

const authenticate = async (payload: AuthenticateRequest) => {
  return apiClient.post<AuthenticateResponse>('/api/v1/auth/authenticate', payload)
}

const uploadProfileImage = async (file: File, token: string) => {
  const formData = new FormData()
  formData.append('file', file)

  return apiClient.post('/api/v1/users/me/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
}

export default { register, authenticate, uploadProfileImage }
