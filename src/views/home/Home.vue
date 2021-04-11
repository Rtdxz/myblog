<template>
  <div>
    <Header></Header>
    <div class="header-img">
      <img src="~@/assets/img/93b3330befbe923b8ae1e154fd14fab8.jpg" alt="" />
      <to-bottom-button />
    </div>

    <div class="container">
      <h1>首页</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="16"
            ><article-list :articles="articles"></article-list>
          </el-col>
          <el-col :sm="24" :md="8"><side-bar></side-bar></el-col>
        </el-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import ArticleList from "@/components/content/ArticleList";
import SideBar from "@/components/content/Sidebar";

import ToBottomButton from "@/components/common/toBottomButton";

import { request } from "@/network/request";
export default {
  name: "Home",
  components: {
    ArticleList,
    SideBar,
    Header,
    Footer,
    ToBottomButton,
  },

  Footerdirectives: {},
  data() {
    return {
      articles: [],
    };
  },
  created() {
    request({
      method: "get",
      url: "/api/article/all",
      /* params: {
        firstName: "Fred",
        sss: "sss",
      }, */
    }).then((res) => {
      this.articles = res.data.data;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
@keyframes display {
  /* 开始状态 */
  0% {
    opacity: 0;
  }
  /* 结束状态 */
  100% {
    opacity: 100%;
  }
  /* 百分比指的是时间占比 */
}
.header-img {
  animation-name: display;
  /* 动画持续时间,必须属性 */
  animation-duration: 0.5s;
  position: relative;
  margin-top: 60px;
  max-height: 900px;
  /* background-color: lightblue; */
  overflow: hidden;
}
.header-img img {
  width: 100%;
  /*  height: 100%;
  object-fit: cover; */
}
</style>