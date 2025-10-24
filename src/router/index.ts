import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:id?',
    name: 'image-home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})
