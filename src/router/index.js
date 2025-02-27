import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: () => import('../views/Borrowing.vue')
    }
  ]
})

export default router
