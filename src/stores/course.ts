import type { CourseStates } from "@/types";
import { defineStore } from "pinia";

export const useCourseStore = defineStore('courses', ({
    state: (): CourseStates => ({
        courses: null
    })
}))