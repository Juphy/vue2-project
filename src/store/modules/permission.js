import { constRoutes, asyncRoutes } from "@/router"

/**
 * 根据路由meta.role 确定是否当前用户拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */

function hasPermission(roles, route){
    if(route.meta&&route.meta.roles){
        return roles.some(role => route.meta.roles.includes(role))
    }else{
        // 如果没有设置 判定为true
        return true
    }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表,首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles){
    const res = []
    
    routes.forEach(route => {
        const tmp = { ...route }
        if(hasPermission(roles, tmp)){
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

const state = {
    routes: [], //完整路由表
    addRoutes: []  //用户可访问路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {

        // routes 用户可以访问的权限
        state.addRoutes = routes

        // 完整的路由表
        state.routes = constRoutes.concat(routes)

    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {

            let accessedRoutes;
            if (roles.includes('admin')) {
                // 用户是管理员则拥有完整访问权限
                accessedRoutes = asyncRoutes || []
            } else {
                //  否则需要根据用户角色做过滤处理
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }

            commit('SET_ROUTES', accessedRoutes)

            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}