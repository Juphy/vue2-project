<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <span
                    v-if="item.redirect === 'noRedirect' || index === leveList.length-1"
                    class="no-redirect"
                    >
                    {{item.meta.title}}
                </span>
                <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'    
export default {
    data(){
        return {
            levelList: null
        }
    },
    watch: {
        $route: {
            handler(route){
                this.getBreadcrumb()
            },
            immediate: true
        }
    },
    methods: {
        getBreadcrumb(){
            console.log(this.$route.matched)
            let matched = this.$route.matched.filter(
                item => item.meta && item.meta.title && item.meta.breadcrumb !== false
            )

            if(!this.isHome(matched[0])){
                matched = [{ path: '/', redirect: 'home', meta: {title: '首页'}}].concat(matched)
            }

            // 处理完指定到levelList
            this.levelList = matched
        },
        isHome(route){
            const name = route && route.name
            if(!name) return false
            return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase()
        },
        pathCompile(path){
            const { params } = this.$route
            return pathToRegexp.compile(path)(params)
        },
        handleLink(item){
            const { redirect, path } = item
            if(redirect){
                this.$router.push(redirect)
                return
            }
            this.$router.push(this.pathCompile(path))
        }
    },
}
</script>