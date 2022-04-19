<template>
  <div class="app-wrapper">
    <el-container class="app-box">
      <el-aside width="220px" class="main-aside">
        <el-header class="heads" height="50px">
          <img src="@/assets/logo.png" alt="logo" />
          <span>Vue.js</span>
        </el-header>
        <sidebar class="sidebar-container"></sidebar>
      </el-aside>
      <el-container class="main">
        <el-header class="heads" height="50px">
          <Headers></Headers>
        </el-header>
        <el-main class="main-container">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/index.vue"
import Headers from "@/components/Headers/Headers.vue"
export default {
  components: {
    Sidebar,
    Headers
  }
}
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.heads {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #dcdfe6;
}
.main {
  width: 100%;
  height: 100%;
}
.main-aside {
  height: 100%;
  background: #001529;
  display: flex;
  flex-direction: column;
  .heads {
    background: #fff;
    text-align: center;
    border: none;
    border: 5px solid #dcdfe6;
    img {
      height: 100%;
    }
    span {
      display: inline-block;
      font-size: 1.5em;
      line-height: 40px;
      color: #273849;
      font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial,
        sans-serif;
      font-weight: 500;
    }
  }
}

.sidebar-container {
  flex: 1;
}
.main-container {
  width: 100%;
  height: 100%;
  padding: 0;
}
.el-menu {
  border: none !important;
}
</style>
