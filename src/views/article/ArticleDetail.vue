<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="article-header">
        <h1>{{ article.title }}</h1>
      </div>
      <div class="padding">
        <div
          class="v-html markdown-body"
          v-html="article.content"
          v-highlight
        ></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { request } from "@/network/request";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

import "@/assets/js/hljs"; //代码高亮

export default {
  name: "ArticleDetail",
  components: {
    Header,
    Footer,
  },
  directives: {},
  data() {
    return {
      article: Object,
      content: "",
      title: "",
    };
  },
  created() {
    let _this = this;
    console.log(this.$route.params.articleId);
    request({
      url: "/api/article/getArticleById",
      methods: "get",
      params: {
        id: _this.$route.params.articleId,
      },
    }).then((res) => {
      let article = res.data.data;
      console.log(article);
      this.article = article;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.container {
  width: 75%;
  margin: 100px auto;
}
.article-header {
  height: 60px;
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
}

/* 对v-html里的图片样式设置 */
.v-html >>> img {
  max-width: 100%;
}
.padding {
  padding: 60px;
}
@media screen and (max-width: 800px) {
  .padding {
    padding: 0;
  }
}
</style>