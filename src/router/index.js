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
          label: '档案管理',
          name: 'borrow',
          component: () => import('../views/admin/Manager.vue')
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
          path: '/admin/userManage',
          label: '账号管理',
          name: 'userManage',
          component: () => import('../views/admin/UserManage.vue')
        },
        {
          path: '/user/info',
          label: '用户信息',
          name: 'user',
          component: () => import('../views/UserInfo.vue')
        }
      ]
    },

  ]
})

export default router
