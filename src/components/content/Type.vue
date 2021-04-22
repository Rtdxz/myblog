<template>
  <div>
    <article-list :articles="articles"></article-list>

    <div class="nomore" v-if="isloading">
      <i class="el-icon-loading"></i>
    </div>
    <el-button v-else-if="page * 10 < page_count" @click="loadData"
      >点击加载更多</el-button
    >
    <div class="nomore" v-else-if="page_count > 10 && page * 10 > page_count">
      没有更多了...
    </div>
    <div class="error-content" v-else></div>
  </div>
</template>

<script>
import ArticleList from "@/components/content/ArticleList";

import {
  getArticlesByType,
  getArticleCountByType,
  getArticlesByPage,
  getArticleCount,
} from "@/network/network";
export default {
  name: "Type",
  components: {
    ArticleList,
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
  props: {
    type: String,
  },

  created() {
    this.loadData();
  },

  watch: {
    $route(to, from) {
      // console.log(to);
      // console.log(from);

      this.page = 0;
      this.articles.length = [];
      this.loadData();
    },
  },
  mounted() {},
  methods: {
    loadData() {
      if (this.type == "index") {
        getArticleCount().then((res) => {
          //this.articles = res.data.data;
          let num = parseInt(JSON.stringify(res.data.data[0]).match(/(\d+)/g));
          this.page_count = num;
        });
        this.isloading = true;
        this.page += 1;

        getArticlesByPage({
          page: this.page, //请求页数
        })
          .then((res) => {
            // console.log(res.data.data, this.page);
            this.articles = this.articles.concat(res.data.data); //将请求回来的数据和上一次进行组合
            this.isloading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // console.log(this.type);
        this.isloading = true;
        var params = null;
        if (this.type == "category") {
          params = {
            category: this.$route.params.category,
            type: "category",
          };
        } else if (this.type == "tag") {
          params = {
            tagname: this.$route.params.tagname,
            type: "tag",
          };
        } else if (this.type == "key") {
          params = {
            key: this.$route.params.key,
            type: "key",
          };
        }
        // console.log(params);
        getArticleCountByType(params).then((res) => {
          //this.articles = res.data.data;
          let num = parseInt(JSON.stringify(res.data.data[0]).match(/(\d+)/g));
          this.page_count = num;
        });

        this.page += 1;
        console.log(this.page);
        params.page = this.page;
        getArticlesByType(params)
          .then(
            (res) => {
              console.log(res.data.data, this.page);
              this.articles = this.articles.concat(res.data.data);
              this.isloading = false;
              if (this.type == "key" && res.data.data.length == 0) {
                this.$message("没有该关键词数据");
              }
            },
            (err) => {
              console.log(err);
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally((res) => {
            this.isloading = false;
            if (this.type == "key") {
              document.body.scrollTop = 0;

              document.documentElement.scrollTop = 0;
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 100%;
}
.error-content {
  height: 1px;
}
</style>