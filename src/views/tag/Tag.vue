<template>
  <div>
    <Header></Header>

    <div class="container">
      <h1>标签页</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="16"
            ><article-list :articles="articles"></article-list>
            <el-button v-if="page * 10 < page_count" @click="loadData"
              >点击加载更多</el-button
            >
            <div class="nomore" v-else>没有更多了...</div>
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

import { request } from "@/network/request";
export default {
  name: "Tag",
  components: {
    ArticleList,
    SideBar,
    Header,
    Footer,
  },
  directives: {},
  data() {
    return {
      articles: [],
      page: 0,
      page_count: 10,
      title: "",
    };
  },
  created() {
    this.loadData();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    console.log(to);
    console.log(from);
    this.articles = [];
    this.page = 0;
    this.loadData();
  },
  mounted() {},
  methods: {
    loadData() {
      request({
        method: "get",
        url: "/api/article/getArticleCountByTag",
        params: {
          tagname: this.$route.params.tagname,
        },
      }).then((res) => {
        let num;
        //this.articles = res.data.data;
        if (res.data.data.length == 0) {
          num = 0;
        } else {
          num = parseInt(JSON.stringify(res.data.data[0]).match(/(\d+)/g));
        }

        this.page_count = num;
      });
      let _this = this;
      this.page += 1;
      //this.title = this.$route.params.tag;
      console.log(this.$route.params.tagname);
      request({
        method: "get",
        url: "/api/article/getArticleByTag",
        params: {
          tagname: _this.$route.params.tagname,
          page: _this.page,
        },
      }).then((res) => {
        console.log(res);
        this.articles = this.articles.concat(res.data.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
}
</style>