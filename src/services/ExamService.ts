import { apiClient } from "./apiClient";

export default {
    getExams() {
        return apiClient.get('/exams')
    },
    getExamByLevelId(levelId: number) {
        return apiClient.get('/exam?levelId=' + levelId)
    }
}