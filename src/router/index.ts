import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
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
import UserExamListView from '@/views/user/exam/ExamListView.vue'
import UserExamView from '@/views/user/exam/ExamView.vue'
import UserExamQuestionView from '@/views/user/exam/ExamQuestionView.vue'

import AdminView from '@/views/AdminView.vue'
import AdminDashboardView from '@/views/admin/DashboardView.vue'
import AdminExamManagementView from '@/views/admin/ExamManagementView.vue'
import AdminExamManagementEditView from '@/views/admin/ExamManagementEditView.vue'
import AdminUserManagementView from '@/views/admin/UserManagementView.vue'
import AdminLevelManagementView from '@/views/admin/LevelManagementView.vue'
import AdminCourseManagementView from '@/views/admin/CourseManagementView.vue'
import { useAuthStore } from '@/stores/auth'
import { useLevelsStore } from '@/stores/levels'
import { useBenefitsStore } from '@/stores/benefits'
import { useServicesStore } from '@/stores/services'
import LevelService from '@/services/LevelService'
import BenefitService from '@/services/BenefitService'
import ServicesService from '@/services/ServiceService'
import { useExamStore } from '@/stores/exam'
import ExamService from '@/services/ExamService'
import QuestionService from '@/services/QuestionService'
import { useQuestionStore } from '@/stores/questions'
import courseService from '@/services/courseService'
import { useCourseStore } from '@/stores/course'
import NoPermissionView from '@/views/NoPermissionView.vue'
import nProgress from 'nprogress'
import { useBadgesStore } from '@/stores/badges'
import BadgeService from '@/services/BadgeService'

const publicRoutes = new Set(['Home', 'Login', 'Register', 'NotFound', 'NoPermission']);
const userRoutes = new Set(['UserProfile', 'UserProfileBadgesView', 'UserProfileExamHistoryView', 'UserServices', 'CourseList', 'CourseView', 'ExamList', 'ExamView', 'ExamQuestionView']);
const adminRoutes = new Set(['AdminView', 'AdminDashboard', 'AdminExamManagement', 'AdminExamManagementEdit', 'AdminUserManagement', 'AdminLevelManagement', 'AdminCourseManagement', 'AdminUserManagementDetail', 'AdminUserProfileBadgesView', 'AdminUserProfileExamHistoryView',]);

const isPublicRoute = (route: RouteLocation) => {
  return publicRoutes.has(route.name as string)
};
const isUserRoute = (route: RouteLocation) => {
  return userRoutes.has(route.name as string)
};
const isAdminRoute = (route: RouteLocation) => {
  return route.path.startsWith('/admin') || adminRoutes.has(route.name as string)
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          if (authStore.isAdmin) {
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
        if (authStore.isAuthenticated) {
          if (authStore.isAdmin) {
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
        if (authStore.isAuthenticated) {
          if (authStore.isAdmin) {
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
          component: UserProfileBadgesView,
        },
        { path: 'history', 
          name: 'UserProfileExamHistoryView', 
          component: UserProfileExamHistoryView,
          props: route => ({ page: route.query.page ? Number(route.query.page) : 1 })
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
      props: true,
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
      component: UserCourseView,
      props: true
    },
    {
      path: '/exam',
      name: 'ExamList',
      component: UserExamListView
    },
    { path: '/exam/:id', 
      name: 'ExamView', 
      component: UserExamView,
      children: [
        { path: 'question', 
          name: 'ExamQuestionView', 
          component: UserExamQuestionView
        },
      ],
      beforeEnter: async (to) => {
        const examStore = useExamStore();
        const questionStore = useQuestionStore();
        const examRes = await ExamService.getExamById(Number(to.params.id))
        if (!examRes?.data) {
          return { name: 'NotFound', params: { catchAll: '404' }, query: { resource: 'exam' } }
        }
        const authStore = useAuthStore();
        const userLevel = authStore.level;
        if (examRes.data.level.id > Number(userLevel)){
          return { name: 'NoPermission', query: { role: 'User with lower level' } }
        }
        try {
          const questionsRes = await QuestionService.getQuestionsByExamId(Number(to.params.id))
          examStore.updateExam(examRes.data);
          questionStore.updateQuestions(questionsRes.data);
        } catch (err: unknown) {
          if ((err as { response?: { status?: number } })?.response?.status === 403) {
            return { name: 'NoPermission', query: { role: 'User with lower level' } }
          }
          throw err
        }
      }
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
        },{
          path: 'question-management/:id',
          name: 'AdminExamManagementEdit',
          component: AdminExamManagementEditView
        },
        {
          path: 'user-management',
          name: 'AdminUserManagement',
          component: AdminUserManagementView,
          props: route => ({ page: route.query.page ? Number(route.query.page) : 1 }),
          children: [
            {
              path: ':id',
              name: 'AdminUserManagementDetail',
              redirect: { name: 'AdminUserProfileBadgesView' },
              component: UserProfileView,
              children: [
                { path: 'badges', 
                  name: 'AdminUserProfileBadgesView', 
                  component: UserProfileBadgesView,
                },
                { path: 'history', 
                  name: 'AdminUserProfileExamHistoryView', 
                  component: UserProfileExamHistoryView,
                  props: route => ({ page: route.query.page ? Number(route.query.page) : 1 })
                },
              ]
            }
          ]
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
          beforeEnter: () => {
            const courseStore = useCourseStore()
            void courseService.getCourses()
              .then(res => courseStore.courses = res.data)
              .catch(error => console.error('Failed to load courses:', error))
          }
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
      props: route => ({ resource: (route.query.resource as string) })
    },
    {
      path: '/no-permission',
      name: 'NoPermission',
      component: NoPermissionView,
      props: route => ({ role: (route.query.role as string) })
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async to => {
  nProgress.start();
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && !isPublicRoute(to)) {
    return { name: 'Home' }
  }
  const userRole = authStore.isAdmin ? 'Admin' : 'User';
  if (isUserRoute(to) && !authStore.isUser) {
    return { name: 'NoPermission', query: { role: userRole } }
  }
  if (isAdminRoute(to) && !authStore.isAdmin) {
    return { name: 'NoPermission', query: { role: userRole } }
  }
  if (authStore.isAuthenticated && !isPublicRoute(to)) {
    const servicesStore = useServicesStore();
    const levelStore = useLevelsStore();
    const benefitStore = useBenefitsStore();
    const badgesStore = useBadgesStore()
    const [servicesRes, levelsRes, benefitsRes, badgesRes] = await Promise.all([
            ServicesService.getServices(),
            LevelService.getLevels(),
            BenefitService.getBenefits(),
            BadgeService.getBadgesByUserId(authStore.id ?? 0)
        ]);
    servicesStore.updateServices(servicesRes.data);
    levelStore.updateLevels(levelsRes.data);
    benefitStore.updateBenefits(benefitsRes.data);
    badgesStore.updateBadges(badgesRes.data)
  }
})

router.afterEach(() => {
  nProgress.done();
})

export default router
