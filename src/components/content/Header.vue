<template>
  <div class="header">
    <div class="header-nav">
      <div class="logo"></div>
      <el-menu
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#000"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="$route.path"
      >
        <el-submenu class="hidden-md-and-up" index="/i">
          <template slot="title"><i class="el-icon-s-unfold"></i></template>
          <el-menu-item index="/home" @click="moveToOtherPage('/home')"
            >首页</el-menu-item
          >
          <el-submenu index="3">
            <template slot="title">分类</template>
            <el-menu-item
              @click="moveToOtherPage('/home/category/' + category.classify)"
              index="'/home/category/' + category.classify"
              v-for="category in categoryList"
              :key="category.classify"
              >{{ category.classify }}</el-menu-item
            >
          </el-submenu>
          <el-menu-item index="/archive" @click="moveToOtherPage('/archive')"
            >归档</el-menu-item
          >
          <el-menu-item index="/message" @click="moveToOtherPage('/message')"
            >留言板</el-menu-item
          >
          <el-menu-item index="/about" @click="moveToOtherPage('/about')"
            >关于</el-menu-item
          ></el-submenu
        >

        <el-menu-item
          index="/home"
          @click="moveToOtherPage('/home')"
          class="hidden-sm-and-down"
          >首页</el-menu-item
        >
        <el-submenu index="2" class="hidden-sm-and-down">
          <template slot="title">分类</template>
          <el-menu-item
            @click="moveToOtherPage('/home/category/' + category.classify)"
            index="'/home/categor/' + category.classify"
            v-for="category in categoryList"
            :key="category.classify"
            >{{ category.classify }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item
          index="/archive"
          @click="moveToOtherPage('/archive')"
          class="hidden-sm-and-down"
          >归档</el-menu-item
        >
        <el-menu-item
          index="/message"
          @click="moveToOtherPage('/message')"
          class="hidden-sm-and-down"
          >留言板</el-menu-item
        >
        <el-menu-item
          index="/about"
          @click="moveToOtherPage('/about')"
          class="hidden-sm-and-down"
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
  </div>
</template>

<script>
import { request } from "@/network/request";

import { getCategoryList } from "@/network/network";
export default {
  name: "Header",
  components: {},
  directives: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      ifLogin: false,
      categoryList: [],
    };
  },
  created() {
    this.ifLogin = window.localStorage.getItem("token") ? true : false;
    this.getCategoryList();
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
    getCategoryList() {
      getCategoryList().then((res) => {
        this.categoryList = res.data.data;
      });
    },
  },
};
</script>

<style scoped>
.header {
  /* margin-bottom: 60px; */
  position: relative;
  width: 100%;
  height: 1px;
}
.header-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  /* opacity: 0.6; */
  z-index: 100;
  box-shadow: 2px 0 4px 4px rgba(100, 100, 100, 0.1);
}
.logo {
  position: absolute;
  left: 50%;
  top: 15px;
  transform: translate(-50%);
  color: #fff;
  z-index: 99999;
  background-image: url("../../assets/img/logo2.png");
  visibility: hidden;
  /* background: no-repeat fixed top; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 30px;
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
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal {
  opacity: 0.6 !important;
  min-height: 60px;
  border-bottom: none; /* 去除默认下边框 */
}
.el-menu--horizontal .el-menu {
  opacity: 0.6 !important;
}
.el-menu /deep/ .el-icon-arrow-down {
  /* content: "1" !important; */
  display: none !important;
}

@media screen and (max-width: 996px) {
  .el-menu {
    border-bottom: none; /* 去除默认下边框 */
  }
}
@media screen and (max-width: 800px) {
  .el-menu--horizontal {
    opacity: 1 !important;
    min-height: 60px;
    border-bottom: none; /* 去除默认下边框 */
  }

  .header {
    /* margin-bottom: 60px; */
    position: relative;
    width: 100%;
    height: 60px;
  }
  .login-info {
    visibility: hidden;
  }
  .logo {
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translate(-50%);
    color: #fff;
    z-index: 99999;
    background-image: url("../../assets/img/logo2.png");
    visibility: visible;
    /* background: no-repeat fixed top; */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 150px;
    height: 30px;
  }
}
</style>