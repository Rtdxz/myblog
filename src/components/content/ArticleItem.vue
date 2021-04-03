<template>
  <div>
    <el-container class="article">
      <el-header class="article-header">{{ article.title }}</el-header>

      <el-main>{{ article.content }}</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
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
  mounted() {},
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