<template>
  <el-container class="home-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">分类</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">留言板</el-menu-item>
          <el-menu-item index="4">关于</el-menu-item>
          <el-menu-item index="5" class="user-info">登录</el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "AdminIndex",
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style  scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: lightblue;
}
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
</style>