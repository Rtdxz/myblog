<template>
  <div>
    <div class="container">
      <div class="year-box" v-for="year in total" :key="year.title">
        <h1>{{ year.title }}</h1>
        <div class="article-list">
          <div
            class="article"
            v-for="article in year.articleList"
            :key="article.id"
          >
            <router-link :to="'/article/' + article.id">{{
              article.title
            }}</router-link
            ><span>{{ article.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

import { getArticlesByTimeLine } from "@/network/network";
export default {
  name: "Archive",
  components: { Header, Footer },
  directives: {},
  data() {
    return {
      total: [],
    };
  },
  created() {
    getArticlesByTimeLine().then((res) => {
      console.log(res);
      this.total = res.data.data;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 3px;
  padding-left: 20px;
  text-decoration: none;
  color: black;
  line-height: 40px;
  font-size: 17px;
}
.article span {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #6e7173;
  font-size: 14px;
}
.article {
  position: relative;
  height: 40px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
.article:hover {
  background-color: #ddd;
}
.article-list {
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  // border-radius: 30px;
}
</style>