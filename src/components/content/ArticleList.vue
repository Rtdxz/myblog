<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24" :key="index" v-for="(article, index) in articles">
        <article-item :article="article"></article-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "@/assets/js/mock.js";

import ArticleItem from "./ArticleItem";

import { request } from "@/network/request";

export default {
  name: "articleList",
  components: {
    ArticleItem,
  },
  directives: {},
  data() {
    return {
      articles: [
        { title: 1, content: 1 },
        { title: 2, content: 1 },
        { title: 3, content: 1 },
        { title: 4, content: 1 },
      ],
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
      console.log(res.data.data);

      this.articles = res.data.data;
    });

    /* this.$axios
      .get("/api/test")
      .then((response) => {
        //console.log(response.data.data);
        this.articles = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      }); */
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped>
.article-list {
  min-height: 600px;
}
</style>