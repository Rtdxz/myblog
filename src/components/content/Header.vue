<template>
  <div class="header">
    <div class="header-nav">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="$route.path"
      >
        <el-menu-item index="/home" @click="moveToOtherPage('/home')"
          >首页</el-menu-item
        >
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="/archive" @click="moveToOtherPage('/archive')"
          >归档</el-menu-item
        >
        <el-menu-item index="/message" @click="moveToOtherPage('/message')"
          >留言板</el-menu-item
        >
        <el-menu-item index="/about" @click="moveToOtherPage('/about')"
          >关于</el-menu-item
        >
        <!-- <el-menu-item
          index="5"
          class="user-info"
          @click="moveToOtherPage('/admin')"
          >个人中心</el-menu-item
        > -->
        <el-submenu class="user-info" index="5" v-if="ifLogin">
          <template slot="title">个人中心</template>
          <el-menu-item index="5-1" @click="moveToOtherPage('/admin')"
            >后台管理</el-menu-item
          >
          <el-menu-item index="5-2" @click="loginOut">退出登录</el-menu-item>
        </el-submenu>
        <el-menu-item
          index="5"
          class="login-info"
          @click="moveToOtherPage('/login')"
          v-else
          >登录</el-menu-item
        >
      </el-menu>
    </div>
    <div class="header-img"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  directives: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      ifLogin: false,
    };
  },
  created() {
    this.ifLogin = window.localStorage.getItem("token") ? true : false;
  },
  mounted() {},
  methods: {
    moveToOtherPage(target) {
      this.$router.push(target);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut() {
      localStorage.removeItem("token");
      location.reload();
    },
  },
};
</script>

<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.header-img {
  margin-top: 60px;
  height: 400px;
  background-color: lightblue;
  overflow: hidden;
}

.user-info {
  position: absolute;
  right: 0px;
  top: 0;
}
.login-info {
  position: absolute;
  width: 68px;
  right: 0;
  top: 0;
}
.el-menu {
  border-bottom: none; /* 去除默认下边框 */
}
</style>