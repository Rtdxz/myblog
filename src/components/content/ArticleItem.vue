<template>
  <div>
    <el-container class="article">
      <el-header class="article-header"
        ><router-link :to="'/article/' + article.id">{{
          article.title
        }}</router-link></el-header
      >
      <div class="time-div">
        <i class="el-icon-date"></i> {{ article.date
        }}<!-- 时间 -->
        <span class="tag" v-for="tag in article.tags" :key="tag">{{
          tag
        }}</span>
      </div>
      <el-main><p v-text="article.describes"></p> </el-main>
      <el-footer>
        <router-link :to="'/article/' + article.id"
          ><el-button size="small">阅读更多=></el-button>
        </router-link></el-footer
      >
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
  computed: {},
  beforeMount() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
.article {
  margin-bottom: 20px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  // background-color: rgba(180, 180, 180, 0.5);
  padding: 10px;
  padding-top: 20px;
}
.el-footer,
.el-header,
.el-main {
  box-sizing: border-box;
}
.el-footer {
  height: 40px !important;
  line-height: 40px;
  text-align: right;
}
.el-main {
  padding-top: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
  font-size: 15px;
}
.el-header {
  height: 40px !important;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  font-weight: 1000;
  font-size: 25px;
  color: #555;
}

.time-div {
  margin-top: 7px;
  padding-left: 20px;
  color: #6e7173;
  font-size: 14px;
}
.tag {
  text-align: center;
  display: inline-block;
  width: auto;
  padding: 0 10px 0;
  margin: 0 10px 10px;
  height: 30px;
  line-height: 30px;
  background: transparent;
  border: 1px solid #f3f3f3;
  font-size: 12px;
  color: #797979;
  border-radius: 2px;
  margin-right: 5px;
}
</style>