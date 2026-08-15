import type { ApiUser } from '@/services/api.ts';
import type { User } from '@/types.ts'

// Map the ApiUser interface to the User interface
// Make the data easier to use
export function mapApiUserToUser(apiUser: ApiUser): User {
    return {
        id: apiUser.id,
        firstName: apiUser.first_name,
        lastName: apiUser.last_name,
        province: apiUser.province ?? '',
        imageUrl: apiUser.image_url ?? '',
        username: apiUser.username,
        password: apiUser.password,
        role: apiUser.role,
        isActive: apiUser.is_active ?? false,
        examHistory: [],
        levelId: 0,
        badgesId: [],
    }
}