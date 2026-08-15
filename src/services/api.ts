const BASE_URL = 'http://localhost:3000';

export async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}