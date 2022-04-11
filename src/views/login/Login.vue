<template>
  <div>
    <input type="text" v-model="username" v-debounce="login" v-emoji />
    <el-button @click="login">登陆</el-button>
    <el-button v-copy="username">一键复制</el-button>
    <el-button v-longpress="longClick">一键复制</el-button>
    <div
      class="el-dialog"
      v-draggable
      v-watermarker="{ 'text': '版权所有', 'textColor': 'rgba(180, 180, 180, 0.4)' }"
      style="position: absolute; width: 200px; height: 200px; background-color: aqua"
    ></div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    login() {
      console.log("test");
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          // 登陆成功后重定向
          this.$router.push({
            path: this.$route.query.redirect || "/",
          });
        })
        .catch((err) => {
          console.log(err);
          Message.error(err);
        });
    },
    longClick() {
      console.log("123123");
    },
  },
};
</script>
