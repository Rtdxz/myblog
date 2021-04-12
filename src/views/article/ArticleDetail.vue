<template>
  <div>
    <Header></Header>

    <div class="container">
      <div class="box">
        <div class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="info">
            <span>{{ article.date }}</span>
          </div>
        </div>
        <div class="padding">
          <div
            class="v-html markdown-body"
            v-html="article.content"
            v-highlight
            ref="markdown"
          ></div>
        </div>
      </div>
    </div>
    <article-nav :titleArray="titleArray"></article-nav>

    <Footer></Footer>
  </div>
</template>

<script>
import { request } from "@/network/request";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

import ArticleNav from "@/components/content/ArticleNav";

import "@/assets/js/hljs"; //代码高亮

export default {
  name: "ArticleDetail",
  components: {
    Header,
    Footer,
    ArticleNav,
  },
  directives: {},
  data() {
    return {
      article: Object,
      content: "",
      title: "",
      titleArray: [],
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
      //console.log(article);
      this.article = article;
    });
  },
  mounted() {
    this.getArticleArray();
  },
  methods: {
    //生成标题数组
    getArticleArray() {
      setTimeout(() => {
        this.$refs.markdown.getElementsByTagName("h1").forEach((ele, index) => {
          ele.h2childArray = [];
          ele.setAttribute("id", ele.innerText);
          let child = ele.nextElementSibling;
          while (child) {
            if (child.tagName == "H1") {
              break;
            }
            if (child.tagName == "H2") {
              child.setAttribute("id", child.innerText);
              ele.h2childArray.push({ label: child.innerText });
            }
            child = child.nextElementSibling;
          }
          // console.log(ele.innerText, ele.h2childArray, index);
          this.titleArray.push({
            label: ele.innerText, //设置成label和children为了和element一样
            children: ele.h2childArray,
          });
          console.log(this.$refs.markdown.getElementsByTagName("h1"));
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
.container {
  width: 75%;
  margin: 100px auto;
}
.box {
  padding: 10px;
  padding-top: 20px;
  min-height: 500px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
.article-header {
  height: 60px;
  font-size: 20px;
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