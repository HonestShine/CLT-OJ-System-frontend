import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/ForgotPassword.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue')
    },
    {
      path: '/problems',
      name: 'Problems',
      component: () => import('@/views/Problems.vue')
    },
    {
      path: '/problem/:id',
      name: 'ProblemDetail',
      component: () => import('@/views/ProblemDetail.vue')
    },

    {
      path: '/nexus',
      name: 'Nexus',
      component: () => import('@/views/Nexus.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:id?',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users/me',
      name: 'UserProfile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id',
      name: 'OtherUserProfile',
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/Rank.vue')
    },
    {
      path: '/submission/:id',
      name: 'SubmissionDetail',
      component: () => import('@/views/SubmissionDetail.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    alert('您需要先登录才能访问此页面')
    next('/login')
  } else {
    next()
  }
})

export default router
