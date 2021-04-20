<template>
  <div id="app">
    <el-backtop :bottom="60"></el-backtop>
    <Header v-if="!isAdmin"></Header>
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive> -->

      <router-view />
      <!-- </keep-alive> -->
    </transition>
    <iframe
      class="musicplayer"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="110"
      src="//music.163.com/outchain/player?type=0&id=690960343&auto=0&height=90"
    ></iframe>
    <Footer v-if="!isAdmin"></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    isAdmin() {
      console.log(this.$route);
      return this.$route.path == "/admin" ? true : false;
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
.musicplayer {
  position: fixed;
  left: 10px;
  bottom: 30px;
}
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

.nomore {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.container {
  max-width: 80%;
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
    margin: 90px auto;
  }
}
</style>
