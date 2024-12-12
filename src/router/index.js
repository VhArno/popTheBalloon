import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { registeredGuard } from '@/guards/registeredGuard'
import { unregisteredGuard } from '@/guards/unregisteredGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: [registeredGuard],
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/success',
      name: 'success',
      beforeEnter: [unregisteredGuard],
      component: () => import('../views/SuccessView.vue'),
    },
    {
      path: '/registered',
      name: 'registered',
      beforeEnter: [unregisteredGuard],
      component: () => import('../views/RegisteredView.vue'),
    },
  ],
})

export default router
