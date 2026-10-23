import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

//save the token in localStorage and add it to the Authorization header for every request
apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem('AUTH_TOKEN')
  if (raw) {
    try {
      const { accessToken } = JSON.parse(raw)
      config.headers.Authorization = `Bearer ${accessToken}`
    } catch {
      // stale value from the pre-merge store (the token used to be a bare string)
      localStorage.removeItem('AUTH_TOKEN')
    }
  }
  return config
})

// Refresh token on 401, then retry the original request.
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (!original || error.response?.status !== 401 || original._retried) {
      throw error
    }
    original._retried = true

    const raw = localStorage.getItem('AUTH_TOKEN')
    if (!raw) throw error

    try {
      const { refreshToken } = JSON.parse(raw)
      const { data } = await axios.post(
        `${original.baseURL}/v1/auth/refresh-token`,
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      )

      const { useAuthStore } = await import('@/stores/auth')
      const { accessToken } = data
      useAuthStore().token = { accessToken, refreshToken }

      original.headers.Authorization = `Bearer ${accessToken}`
      return apiClient(original)
    } catch {
      const { useAuthStore } = await import('@/stores/auth')
      useAuthStore().token = null
      throw error
    }
})