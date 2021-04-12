<template>
  <div>
    <Header></Header>
    <div class="header-img">
      <!-- <h1 class="title">RT的博客</h1> -->
      <img src="~@/assets/img/93b3330befbe923b8ae1e154fd14fab8.jpg" alt="" />
      <to-bottom-button />
    </div>

    <div class="container">
      <h1>首页</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="16" class="context"
            ><article-list :articles="articles"></article-list>
            <el-button v-if="page * 10 < page_count" @click="loadMore"
              >点击加载更多</el-button
            >
            <el-button v-else>没有更多了</el-button>
          </el-col>
          <el-col :sm="24" :md="8"><side-bar></side-bar></el-col>
        </el-row>
      </div>
    </div>
    <!-- <music-player></music-player> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import ArticleList from "@/components/content/ArticleList";
import SideBar from "@/components/content/Sidebar";

import ToBottomButton from "@/components/common/toBottomButton";
import MusicPlayer from "@/components/common/MusicPlayer";

import { request } from "@/network/request";
export default {
  name: "Home",
  components: {
    ArticleList,
    SideBar,
    Header,
    Footer,
    ToBottomButton,
    MusicPlayer,
  },

  Footerdirectives: {},
  data() {
    return {
      articles: [],
      page: 1,
      page_count: 10,
    };
  },
  created() {
    let _this = this;
    request({
      method: "get",
      url: "/api/article/getArticlesByPage",
      params: {
        page: _this.page,
      },
    }).then((res) => {
      this.articles = res.data.data;
      console.log(res);
    });

    request({
      method: "get",
      url: "/api/article/getArticleCount",
    }).then((res) => {
      //this.articles = res.data.data;
      let num = parseInt(JSON.stringify(res.data.data[0]).match(/(\d+)/g));
      _this.page_count = num;
    });
  },
  mounted() {},
  methods: {
    loadMore: function () {
      this.page += 1;
      this.getArticle({
        page: this.page, //请求页数
      })
        .then((res) => {
          console.log(res.data.data, this.page);
          this.articles = this.articles.concat(res.data.data); //将请求回来的数据和上一次进行组合
        })
        .catch((err) => {
          this.$toast.fail("系统开小差,请重试");
        });
    },
    getArticle(params) {
      return request({
        method: "get",
        url: "/api/article/getArticlesByPage",
        params: params,
      }) /* then((res) => {
        this.articles = res.data.data;
      }) */;
    },
  },
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
  animation-duration: 3s;
  animation-direction: alternate;
  position: relative;

  max-height: 600px;
  width: 100%;
  /* background-color: lightblue; */
  overflow: hidden;
}
.header-img img {
  width: 100%;
  /*  height: 100%;
  object-fit: cover; */
}
.title {
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  font-size: 5vw;
  left: 50%;
  top: 0;
  margin: 0;
  transform: translate(-50%);
  letter-spacing: 3vw;
}
.container {
  margin: 0 auto;
}
.el-button {
  width: 100%;
}
</style>