<template>
  <div id="app">
    <el-backtop :bottom="60"></el-backtop>
    <Header v-if="!isAdmin"></Header>
    <transition name="fade-transform" mode="out-in">
      <div class="c">
        <keep-alive include="Home,Archive,About,Category">
          <router-view />
        </keep-alive>
      </div>
    </transition>
    <cloud-music-player class="hide-player"></cloud-music-player>
    <Footer v-if="!isAdmin"></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import CloudMusicPlayer from "@/components/common/CloudMusicPlayer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    CloudMusicPlayer,
  },
  computed: {
    isAdmin() {
      // console.log(this.$route);
      return this.$route.path.indexOf("/admin") != -1 ? true : false;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/markdown.css";
@import "assets/css/iconfont/iconfont.css";
/* * {
  transition: ease-out 0.1s;
} */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all linear 0.3s;
}

/* 
enter定义进入过渡的开始状态
 */
.fade-transform-enter {
  opacity: 0;
  /* transform: translateX(-30px); */
}
/* 
leave-to离场动画结束后的状态
 */
.fade-transform-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
}

.c {
  min-height: 70vh;
}

.nomore {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.container {
  max-width: 70%;
  margin: 120px auto;
  min-height: 800px;
}

.el-menu--popup {
  opacity: 0.6;
}

.el-menu {
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition-property: border-color, background-color, color;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s;
}

@media screen and (max-width: 800px) {
  .el-menu-item,
  .el-submenu,
  .el-menu,
  .el-submenu__title {
    opacity: 1;
    background-color: #1b1c1d !important;
  }
}
@media screen and (max-width: 800px) {
  .container {
    max-width: 95% !important;
    margin: 40px auto;
  }
}
</style>
