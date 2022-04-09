import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element-ui'

import directives from '@/directives'
Vue.use(directives)

Vue.config.productionTip = false

// 全局路由守卫
import './router/permission'


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')