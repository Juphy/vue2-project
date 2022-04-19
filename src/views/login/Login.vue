<template>
  <div>
    <input type="text" v-model="username"/>
    <el-button v-debounce:click="login">登陆</el-button>
  </div>
</template>

<script>
import { Message } from "element-ui"

export default {
  data() {
    return {
      username: ""
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          // 登陆成功后重定向
          this.$router.push({
            path: this.$route.query.redirect || "/index"
          })
        })
        .catch((err) => {
          console.log(err)
          Message.error(err)
        })
    }
  }
}
</script>
