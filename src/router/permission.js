import router from './index'
import store from '@/store/index'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // 排除路径

router.beforeEach(async (to, from, next) => {
    // 获取令牌判定用户是否登录
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 已登录重定向到首页
            next({ path: '/' })
        } else {
            // 若用户角色已附加则说明动态路由已经添加
            const hasRoles = store.getters.roles && store.getters.roles.length > 0

            if (hasRoles) {
                next()
            } else {
                try {
                    //先请求获取用户角色
                    const { roles } = await store.dispatch('user/getInfo')

                    // 根据当前用户角色动态生成路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    // 添加这些路由至路由器
                    accessRoutes.forEach(route => {
                        router.addRoute(route)
                    })

                    // 继续路由切换,确保addRoutes完成
                    next({ ...to, replace: true })
                } catch (error) {
                    // 出错需要重置令牌并重新登陆(令牌过期,网络错误等原因)
                    await store.dispatch('user/resetToken')
                    Message.error(error || "网络错误")
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        // 用户无令牌
        if (whiteList.indexOf(to.path) !== -1) {
            //白名单路由放过
            next()
        } else {
            // 重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})