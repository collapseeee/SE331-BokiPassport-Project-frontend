import type { Course } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getCourses() {
        return apiClient.get('courses')
    },
    getCourse(id: number) {
        return apiClient.get('courses/' + id)
    },
    getCoursesByLevelId(levelId: number) {
        return this.getCourses()
            .then((res) => {
                return res.data.filter((course: Course) => Number(course.levelId) === levelId)
            })
            .catch((err) => {
                console.error('Error occurs while get courses: ', err)
            })
    }
}