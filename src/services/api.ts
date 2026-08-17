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
  first_name: string
  last_name: string
  province: string | null
  image_url: string | null
  username: string
  password: string
  role: string
  is_active: boolean | null
}

export default {
  getUsers() {
    return apiClient.get<ApiUser[]>('/user')
  },
  getUser(id: number) {
    return apiClient.get<ApiUser>(`/user/${id}`)
  },
}