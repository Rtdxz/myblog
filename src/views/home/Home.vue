<template>
  <div style="width: 100%">
    <div class="header-img" v-loading="loading">
      <!-- <h1 class="title">RT的博客</h1> -->
      <img v-loading="loading" :src="imgUrl" alt="图片加载失败" />
      <to-bottom-button />
    </div>

    <div class="container">
      <h1>文章</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="17" class="context">
            <article-list :articles="articles"></article-list>

            <div class="nomore" v-if="isloading">
              <i class="el-icon-loading"></i>
            </div>
            <el-button v-else-if="page * 10 < page_count" @click="loadMore"
              >点击加载更多</el-button
            >
            <div class="nomore" v-else>没有更多了...</div>
          </el-col>
          <el-col :sm="24" :md="7"><side-bar></side-bar></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import ArticleList from "@/components/content/ArticleList";
import SideBar from "@/components/content/Sidebar";

import ToBottomButton from "@/components/common/toBottomButton";
import MusicPlayer from "@/components/common/MusicPlayer";

import { getArticlesByPage, getArticleCount } from "@/network/network";

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
      isloading: true,
      loading: true,
      imgUrl: require("@/assets/img/Snipaste_2021-04-19_23-29-25.png"),
    };
  },
  beforeMount() {
    getArticlesByPage({ page: this.page }).then((res) => {
      this.articles = res.data.data;
      console.log(res.data);
      this.isloading = false;
    });

    getArticleCount().then((res) => {
      //this.articles = res.data.data;
      let num = parseInt(JSON.stringify(res.data.data[0]).match(/(\d+)/g));
      this.page_count = num;
    });
  },
  mounted() {
    this.imgLoad(this.imgUrl);
  },
  methods: {
    //图片加载loading方法
    imgLoad: function (src) {
      let _this = this;
      console.log(this);
      let bgImg = new Image();
      bgImg.src = src; // 获取背景图片的url
      bgImg.onerror = () => {
        console.log("img onerror");
      };
      bgImg.onload = () => {
        // 等背景图片加载成功后 去除loading
        console.log("加载完成");
        _this.loading = false;
      };
    },
    loadMore: function () {
      this.isloading = true;
      this.page += 1;
      getArticlesByPage({
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 80%;
  margin: 60px auto;
  min-height: 800px;
}
@media screen and (max-width: 800px) {
  .container {
    max-width: 95% !important;
    margin: 30px auto;
  }
  .header-img {
  }
}

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
  /* 动画持续时间,必须属性 */
  animation-name: display;
  animation-duration: 3s;
  animation-direction: alternate;
  position: relative;

  max-height: 470px;
  width: 100%;
  /* background-color: lightblue; */
  overflow: hidden;
}
.header-img img {
  width: 100%;

  /*  height: 100%;
  object-fit: cover; */
}
/* .title {
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  font-size: 5vw;
  left: 50%;
  top: 0;
  margin: 0;
  transform: translate(-50%);
  letter-spacing: 3vw;
}
 */
/* .title {
  position: relative;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  margin-bottom: 30px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
  span {
    position: absolute;
    right: 10px;
  }
} */
.el-button {
  width: 100%;
}
</style>