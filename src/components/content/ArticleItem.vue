<template>
  <div>
    <el-container class="article">
      <router-link :to="'/article/' + article.id"
        ><el-header class="article-header">{{
          article.title
        }}</el-header></router-link
      >
      <el-main v-html="article.describes"></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "ArticleItem",
  components: {},
  directives: {},
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
    },
  },

  beforeMount() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.article {
  margin-bottom: 20px;
  height: 300px;
  background-color: rgba(180, 180, 180, 0.5);
}
</style>