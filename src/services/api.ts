const BASE_URL = 'http://localhost:3000';

export async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

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