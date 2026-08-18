import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
    baseURL: BASE_URL
})
// Pull data from Json server
// Use this command to start the server: npx json-server --watch db.json --port 3001
export function fetchUsers() {
    return apiClient.get('user')
}

    //Format the out put after fetchUsers
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