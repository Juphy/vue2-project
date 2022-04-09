<template>
    <div>
        <input type="text" v-model="username" @keyup.enter="login">
        <el-button @click="login">登陆</el-button>
        <el-button v-copy="username">一键复制</el-button>
    </div>
</template>

<script>
import { Message } from "element-ui"

export default {
    data(){
        return {
            username: ''
        }
    },
    methods: {
        login(){
            this.$store
                .dispatch('user/login', { username: this.username })
                .then(() => {
                    // 登陆成功后重定向
                    this.$router.push({
                        path: this.$route.query.redirect || '/'
                    })
                })
                .catch(err => {
                    console.log(err)
                    Message.error(err)
                })
        }
    }

}
</script>