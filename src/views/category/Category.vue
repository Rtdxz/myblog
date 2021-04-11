<template>
  <div>
    <Header></Header>

    <div class="container">
      <h1>分类页面</h1>
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

import { request } from "@/network/request";
export default {
  name: "Category",
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
    };
  },
  created() {
    this.loadData();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    console.log(to);
    console.log(from);
    this.loadData();
  },
  mounted() {},
  methods: {
    loadData() {
      let _this = this;
      console.log(this.$route.params.category);
      request({
        method: "get",
        url: "/api/article/getArticleByCategory",
        params: {
          category: _this.$route.params.category,
        },
      }).then((res) => {
        console.log(res);
        this.articles = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>