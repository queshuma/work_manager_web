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
      component: () => import('../views/Admin.vue'),
      children: [
        {
          path: '/admin/borrow',
          label: '档案借阅',
          name: 'borrow',
          component: () => import('../views/admin/Borrowing.vue')
        },
        {
          path: '/admin/back',
          label: '档案归还',
          name: 'back',
          component: () => import('../views/admin/Backing.vue')
        },
        {
          path: '/admin/classify',
          label: '档案分类',
          name: 'classify',
          component: () => import('../views/admin/Classify.vue')
        },
        {
          path: '/admin/user',
          label: '档案分类',
          name: 'user',
          component: () => import('../views/admin/User.vue')
        }
      ]
    },

  ]
})

export default router
