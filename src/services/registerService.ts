import { apiClient } from './apiClient'

export interface RegisterPayload {
  firstname: string
  lastname: string
  username: string
  password: string
  province: string
  profileImage?: string
}

export interface AuthenticatePayload {
  username: string
  password: string
}

export interface AuthenticateResponse {
  token: string
}

const register = async (payload: RegisterPayload) => {
  return apiClient.post('/api/v1/auth/register', payload)
}

const authenticate = async (payload: AuthenticatePayload) => {
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
