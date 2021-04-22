<template>
  <div>
    <div class="container">
      <div class="box" v-loading="loading">
        <div class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="info">
            <span style="font-size: 1em">{{ article.date }}</span>
          </div>
        </div>
        <div class="padding">
          <div
            class="v-html markdown-body"
            v-html="article.content"
            v-highlight
            ref="markdown"
            v-lazy-container="{ selector: 'img' }"
          ></div>
        </div>
      </div>
    </div>
    <article-nav :titleArray="titleArray"></article-nav>
  </div>
</template>

<script>
import { getArticleById } from "@/network/network";

import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

import ArticleNav from "@/components/content/ArticleNav";

import "@/assets/js/hljs"; //代码高亮

import utils from "@/utils/utils";

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
      loading: true,
    };
  },
  created() {
    console.log(this.$route.params.articleId);
    getArticleById({
      id: this.$route.params.articleId,
    }).then((res) => {
      console.log(res);
      let article = res.data.data;
      //console.log(article);

      this.article = article;
      this.article.content = this.article.content.replace(/src/g, "data-src");
      this.getArticleArray();
      this.loading = false;
    });
  },
  mounted() {
    utils.lazyload();
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

        if (this.titleArray.length == 0) {
          this.$refs.markdown
            .getElementsByTagName("h2")
            .forEach((ele, index) => {
              this.titleArray.push({
                label: ele.innerText, //设置成label和children为了和element一样
              });
              ele.setAttribute("id", ele.innerText);
            });
        }
      }, 100);
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  padding: 10px;
  padding-top: 20px;
  min-height: 700px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.article-header {
  font-size: 20px;
  text-align: center;
  margin-bottom: 1em;
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
    padding: 20px;
  }
}
</style>