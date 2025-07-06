import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store.js'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/dashboard.vue') },
  { path: '/completed', name: 'completed', component: () => import('../views/completed.vue') },
  { path: '/help', name: 'help', component: () => import('../views/help.vue') },
  { path: '/knowledge-base', name: 'knowledge-base', component: () => import('../views/knowledge-base.vue') },
  { path: '/scheduled', name: 'scheduled', component: () => import('../views/scheduled.vue') },
  { path: '/search', name: 'search', component: () => import('../views/search.vue') },
  { path: '/settings', name: 'settings', component: () => import('../views/settings.vue') },
  { path: '/inspections', name: 'inspections', component: () => import('../views/inspections.vue') },
  { path: '/inspection', name: 'inspection', component: () => import('../views/inspection.vue') },
  { path: '/login', name: 'login', component: () => import('../views/login.vue') },
  { path: '/:catchAll(.*)', redirect: '/' } // fallback
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Route guards
router.beforeEach((to, from, next) => {
  const user = store.getters.user
  const isLoggedIn = !!user?.id

  if (to.name !== 'login' && !isLoggedIn) {
    console.warn('🔐 Niet ingelogd → redirect naar login')
    next({ name: 'login' })
  } else if (to.name === 'login' && isLoggedIn) {
    console.info('👋 Al ingelogd → redirect naar home')
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router