import type { Course } from "@/types"
import { apiMockClient } from "./apiClient"

export default {
    getCourses() {
        return apiMockClient.get('courses')
    },
    getCourse(id: number) {
        return apiMockClient.get('courses/' + id)
    },
    getCoursesByLevelId(levelId: number) {
        return this.getCourses()
            .then((res) => {
                return res.data.filter((course: Course) => Number(course.levels.id) === levelId)
            })
            .catch((err) => {
                console.error('Error occurs while get courses: ', err)
            })
    }
}