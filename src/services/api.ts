import axios from 'axios';

// Pull data from json-server
// Start it with: npx json-server --watch db.json --port 3001
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export interface ApiUser {
  id: number
  firstName: string
  lastName: string
  province: string | null
  imageUrl: string | null
  username: string
  password: string
  role: string
  isActive: boolean | null
}

export interface Apicourse {
  id: number
  name: string
  description: string
  videoUrl: string
  createdAt: Date
  serviceId: number
}

export default {
  getUsers() {
    return apiClient.get<ApiUser[]>('/user')
  },
  getUser(id: number) {
    return apiClient.get<ApiUser>(`/user/${id}`)
  },
   getCourses() {
    return apiClient.get<Apicourse[]>('/course')
  },
  getCourse(id: number) {
    return apiClient.get<Apicourse>(`/course/${id}`)
  },
}
