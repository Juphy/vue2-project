import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/Login'),
        hidden: true // 导航菜单忽略
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '布局',
            icon: 'el-icon-share'
        },
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home.vue'),
                name: 'Home',
                meta: {
                    title: 'Home',
                    icon: 'el-icon-edit'
                }
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect: '/abount/index',
        meta: {
            title: '关于',
            icon: 'el-icon-edit'
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/about/About.vue'),
                name: 'about',
                meta: {
                    title: "About",
                    icon: 'el-icon-edit',
                    roles: ['admin', 'editor']
                }
            }            
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRoutes
})

export default router