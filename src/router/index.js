import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        label: '首页',
        component: () => import('../views/IndexModel.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        label: '数据管理',
        component: () => import('../views/IndexModel.vue'),
        children: [
            {
                path: '/admin/borrow',
                label: '档案管理',
                name: 'borrow',
                component: () => import('../views/ManagerModel.vue')
            },
            {
                path: '/admin/back',
                label: '档案归还',
                name: 'back',
                component: () => import('../views/BackingModel.vue')
            },
            {
                path: '/admin/classify',
                label: '档案分类',
                name: 'classify',
                component: () => import('../views/ClassifyModel.vue')
            },
            {
                path: '/admin/user',
                label: '档案分类',
                name: 'user',
                component: () => import('../views/UserMode.vue')
            }
        ]
    },
    {
        path: '/sysSetting',
        name: 'sysSetting',
        label: '系统设置',
        component: () => import('../views/LoginModel.vue'),
    },
    {
        path: '/userSetting',
        name: 'userSetting',
        label: '用户设置',
        component: () => import('../views/LoginModel.vue'),
    },
    {
        path: '/login',
        name: 'login',
        label: '登录',
        component: () => import('../views/LoginModel.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router