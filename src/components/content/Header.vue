<template>
  <div class="header">
    <div class="header-nav">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="moveToOtherPage('home')"
          >首页</el-menu-item
        >
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">留言板</el-menu-item>
        <el-menu-item index="4">关于</el-menu-item>
        <el-menu-item
          index="5"
          class="user-info"
          @click="moveToOtherPage('admin')"
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
    };
  },
  mounted() {},
  methods: {
    moveToOtherPage(target) {
      this.$router.push(target);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
}
.user-info {
  position: absolute;
  right: 0;
  top: 0;
}
</style>