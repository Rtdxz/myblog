<template>
  <el-container class="home-container">
    <el-header class="header"
      ><el-button
        type="primary"
        icon="el-icon-arrow-left"
        class="back-button"
        @click="moveToOtherPage('/home')"
        >回到首页</el-button
      >后台管理</el-header
    >
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
          <el-menu-item index="1" @click="moveToOtherPage('/admin/')"
            >后台首页</el-menu-item
          >

          <el-menu-item index="2">账号管理</el-menu-item>

          <el-menu-item
            index="3"
            @click="moveToOtherPage('/admin/articleManage')"
            >博客管理</el-menu-item
          >
          <el-menu-item
            index="4"
            @click="moveToOtherPage('/admin/articleWrite')"
            >编写博客</el-menu-item
          >
          <!-- <el-menu-item index="4">关于</el-menu-item>
          <el-menu-item index="5" class="user-info">登录</el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
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
    moveToOtherPage(target) {
      this.$router.push(target);
    },
  },
};
</script>

<style  lang="sass" scoped>
$black-color: #545c64
$blue-color: #409eff

a
  text-decoration: none
  color: #fff

.el-menu
  border-right: 0

  &-item
    text-align: center

.back-button
  position: absolute
  left: 20px
  top: 10px

.header
  position: relative
  width: 100%
  height: 60px
  text-align: center
  line-height: 60px
  color: #fff
  font-size: 20px
  background-color: $blue-color
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px

.home-container
  height: 100%

.el-aside
  background-color: $black-color
</style>