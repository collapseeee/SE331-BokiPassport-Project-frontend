import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import UserProfileView from '@/views/user/ProfileView.vue'
import UserServicesView from '@/views/user/ServicesView.vue'
import UserBenefitsView from '@/views/user/BenefitsView.vue'
import UserCourseListView from '@/views/user/CourseListView.vue'
import UserCourseView from '@/views/user/CourseView.vue'
import UserExamView from '@/views/user/ExamView.vue'

import AdminDashboardView from '@/views/admin/DashboardView.vue'
import AdminExamManagementView from '@/views/admin/ExamManagementView.vue'
import AdminUserManagementView from '@/views/admin/UserManagementView.vue'
import AdminLevelManagementView from '@/views/admin/LevelManagementView.vue'
import AdminCourseManagementView from '@/views/admin/CourseManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfileView,
      children: [
        { path: 'services', name: 'UserServices', component: UserServicesView },
        { path: 'benefits', name: 'UserBenefits', component: UserBenefitsView },
        {
          path: 'course',
          name: 'UserCourseList',
          component: UserCourseListView
        },
        { path: 'course/:id', name: 'UserCourse', component: UserCourseView },
        { path: 'exam', name: 'UserExam', component: UserExamView }
      ]
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboardView,
      children: [
        {
          path: 'exam-management',
          name: 'AdminExamManagement',
          component: AdminExamManagementView
        },
        {
          path: 'user-management',
          name: 'AdminUserManagement',
          component: AdminUserManagementView
        },
        {
          path: 'level-management',
          name: 'AdminLevelManagement',
          component: AdminLevelManagementView
        },
        {
          path: 'course-management',
          name: 'AdminCourseManagement',
          component: AdminCourseManagementView
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
