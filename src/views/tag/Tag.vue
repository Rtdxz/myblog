<template>
  <div>
    <div class="container">
      <h1>{{ title }}</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="17"
            ><article-list :articles="articles"></article-list>
            <div class="nomore" v-if="isloading">
              <i class="el-icon-loading"></i>
            </div>
            <el-button v-else-if="page * 10 < page_count" @click="loadData"
              >点击加载更多</el-button
            >
            <div
              class="nomore"
              v-else-if="page_count > 10 && page * 10 > page_count"
            >
              没有更多了...
            </div>
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
      isloading: true,
    };
  },
  created() {
    this.loadData();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    console.log(to);
    console.log(from);
    this.page = 0;
    this.loadData();
  },
  mounted() {},
  methods: {
    loadData() {
      this.isloading = true;
      this.title = this.$route.params.tagname;
      request({
        method: "get",
        url: "/api/article/getArticleCountByType",
        params: {
          tagname: this.$route.params.tagname,
          type: "tag",
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
        url: "/api/article/getArticlesByType",
        params: {
          tagname: _this.$route.params.tagname,
          page: _this.page,
          type: "tag",
        },
      }).then((res) => {
        this.articles = [];

        console.log(res);
        this.articles = this.articles.concat(res.data.data);
        this.isloading = false;
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