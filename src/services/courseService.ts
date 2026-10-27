import type { Course, CourseRequest } from "@/types"
import { apiClient } from "./apiClient"

export default {
    getCourses() {
        return apiClient.get('/v1/courses')
    },
    getCourse(id: number) {
        return apiClient.get(`/v1/courses/${id}`)
    },
    getCoursesByLevelId(levelId: number) {
        return this.getCourses()
            .then((res) => {
                return res.data.filter((course: Course) => Number(course.level.id) === levelId)
            })
            .catch((err) => {
                console.error('Error occurs while get courses: ', err)
            })
    },
    saveCourse(course: CourseRequest) {
        return apiClient.post('/v1/courses', course as Course)
    }
}