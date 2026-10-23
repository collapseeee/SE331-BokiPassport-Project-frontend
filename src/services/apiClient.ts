import axios from 'axios'

// will delete later, just for testing purpose
export const apiMockClient = axios.create({
  baseURL: import.meta.env.VITE_MOCK_BACKEND_URL || 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((request) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  // need to delete later.
  console.log('Request Interceptor: ', request)
  if (token) {
    const { accessToken } = JSON.parse(token)
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

// Refresh token on 401 response with BARE axios call.
apiClient.interceptors.response.use(undefined, async (error) => {
  const original = error.config
  if (error.response?.status !== 401 || original._retried) throw error
  original._retried = true

  const stored = JSON.parse(localStorage.getItem('AUTH_TOKEN')!)
  const { data } = await axios.post(
    `${original.baseURL}/v1/auth/refresh-token`, null, 
    { headers: { Authorization: `Bearer ${stored.refreshToken}` } }
  )
  
  // Update the token in the auth store and localStorage
  const { useAuthStore } = await import('@/stores/auth')
  useAuthStore().token = { accessToken: data.accessToken, refreshToken: data.refreshToken }

  original.headers.Authorization = `Bearer ${data.accessToken}`
  return apiClient(original)
})