import Vue from "vue"
import VueRouter from "vue-router"

import Layout from "@/layout"

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/Login"),
    hidden: true // 导航菜单忽略
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    hidden: true
  },
  {
    path: "/index",
    component: Layout,
    name: "index",
    meta: {
      title: "首页",
      icon: "el-icon-edit"
    },
    children: [
      {
        path: "",
        component: () => import("@/views/index/index.vue"),
        name: "indexs",
        meta: {
          title: "首页",
          icon: "el-icon-edit",
          roles: ["admin", "jerry"]
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/abount/index",
    meta: {
      title: "关于",
      icon: "el-icon-edit"
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/about/About.vue"),
        name: "about",
        meta: {
          title: "About",
          icon: "el-icon-edit",
          roles: ["admin", "jerry"]
        }
      },
      {
        path: "good",
        component: () => import("@/views/goods/index.vue"),
        name: "good",
        meta: {
          title: "good",
          icon: "el-icon-edit",
          roles: ["admin", "jerry"]
        }
      }
    ]
  },
  {
    path: "/good",
    component: Layout,
    meta: {
      title: "商品管理",
      icon: "el-icon-edit"
    },
    children: [
      {
        path: "good",
        component: () => import("@/views/goods/index.vue"),
        name: "good",
        meta: {
          title: "good",
          icon: "el-icon-edit",
          roles: ["admin", "jerry"]
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
