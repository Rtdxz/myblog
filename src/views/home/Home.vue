<template>
  <div>
    <Header></Header>
    <div class="header-img" v-loading="loading">
      <!-- <h1 class="title">RT的博客</h1> -->
      <img
        src="~@/assets/img/93b3330befbe923b8ae1e154fd14fab8.jpg"
        alt="图片加载失败"
      />
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
            <div class="nomore" v-else-if="isloading">
              <i class="el-icon-loading"></i>
            </div>
            <div class="nomore" v-else>没有更多了...</div>
          </el-col>
          <el-col :sm="24" :md="8"><side-bar></side-bar></el-col>
        </el-row>
      </div>
    </div>
    <music-player></music-player>
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
      isloading: false,
      loading: true,
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
      console.log(res.data);
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
  mounted() {
    if (!this.imgLoad("@/assets/img/93b3330befbe923b8ae1e154fd14fab8.jpg")) {
      this.loading = false;
    }
  },
  methods: {
    //图片加载loading方法
    imgLoad: (src) => {
      let bgImg = new Image();
      bgImg.src = src; // 获取背景图片的url
      bgImg.onerror = () => {
        console.log("img onerror");
      };
      bgImg.onload = () => {
        // 等背景图片加载成功后 去除loading
        console.log("加载完成");
        return false;
      };
    },
    loadMore: function () {
      this.isloading = true;
      this.page += 1;
      this.getArticle({
        page: this.page, //请求页数
      })
        .then((res) => {
          console.log(res.data.data, this.page);
          this.articles = this.articles.concat(res.data.data); //将请求回来的数据和上一次进行组合
          this.isloading = false;
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
    opacity: 0.1;
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

  max-height: 400px;
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