// 封装一个指令v-permission,从而实现按钮级别权限控制
import store from "@/store"
/**
 * 指令的使用
 * v-permission="['admin','editor']"
 */

const permission = {
    inserted(el, binding) {
        const { value: pRoles } = binding;
        // 获取用户角色
        const roles = store.getters && store.gteers.roles
        if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
            const hasPermission = roles.some(role => pRoles.includes(role))
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组,如v-permission="['admin','editor']"`)
        }
    }
}

export default permission