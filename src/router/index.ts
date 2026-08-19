import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import UserProfileView from '@/views/user/profile/ProfileView.vue'
import UserProfileBadgesView from '@/views/user/profile/BadgesView.vue'
import UserProfileExamHistoryView from '@/views/user/profile/ExamHistoryView.vue'
import UserServicesView from '@/views/user/ServicesView.vue'
import UserCourseListView from '@/views/user/CourseListView.vue'
import UserCourseView from '@/views/user/CourseView.vue'
import UserExamListView from '@/views/user/ExamListView.vue'
import UserExamView from '@/views/user/ExamView.vue'

import AdminView from '@/views/AdminView.vue'
import AdminDashboardView from '@/views/admin/DashboardView.vue'
import AdminExamManagementView from '@/views/admin/ExamManagementView.vue'
import AdminUserManagementView from '@/views/admin/UserManagementView.vue'
import AdminLevelManagementView from '@/views/admin/LevelManagementView.vue'
import AdminCourseManagementView from '@/views/admin/CourseManagementView.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: () => {
        const authStore = useAuthStore()
        const userStore = useUserStore()
        if (authStore.isAuthenticated()) {
          if (userStore.role === 'ADMIN') {
            return { name: 'AdminView' }
          }
          return { name: 'UserProfile' }
        }
      }
    },
    { 
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: () => {
        const authStore = useAuthStore()
        const userStore = useUserStore()
        if (authStore.isAuthenticated()) {
          if (userStore.role === 'ADMIN') {
            return { name: 'AdminView' }
          }
          return { name: 'UserProfile' }
        }
      }
    },
    { path: '/register', 
      name: 'Register', 
      component: RegisterView,
      beforeEnter: () => {
        const authStore = useAuthStore()
        const userStore = useUserStore()
        if (authStore.isAuthenticated()) {
          if (userStore.role === 'ADMIN') {
            return { name: 'AdminView' }
          }
          return { name: 'UserProfile' }
        }
      }
    },
    {
      path: '/user',
      name: 'UserProfile',
      redirect: { name: 'UserProfileBadgesView' }, // Redirect to badge when entering the user profile
      component: UserProfileView,
      children: [
        { path: 'badges', 
          name: 'UserProfileBadgesView', 
          component: UserProfileBadgesView 
        },
        { path: 'history', 
          name: 'UserProfileExamHistoryView', 
          component: UserProfileExamHistoryView 
        },
      ]
    },
    {
      path: '/user/services', 
      name: 'UserServices', 
      component: UserServicesView 
    },
    {
      path: '/courses',
      name: 'CourseList',
      component: UserCourseListView,
      beforeEnter: (to) => {
            if (to.query.level) {
              return
            }
            to.query.level = 'all'
      }
    },
    {
      path: '/courses/:id',
      name: 'CourseView',
      component: UserCourseView
    },
    {
      path: '/exam',
      name: 'ExamList',
      component: UserExamListView,
      children: [
        { path: ':id', 
          name: 'ExamView', 
          component: UserExamView
        },
      ]
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView,
      redirect: { name: 'AdminDashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: AdminDashboardView
        },
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
          component: AdminCourseManagementView,
          beforeEnter: (to) => {
            if (to.query.level) {
              return
            }
            to.query.level = 'all'
          }
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

router.beforeEach(to => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated() && to.name !== 'Login' && to.name !== 'Home' && to.name !== 'Register') {
    return { name: 'Home' }
  }
})

export default router
