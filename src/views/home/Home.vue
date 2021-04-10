<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>首页</h1>
      <div>
        <el-row :gutter="30">
          <el-col :sm="24" :md="16"><article-list></article-list> </el-col>
          <el-col :sm="24" :md="8"><side-bar></side-bar></el-col>
        </el-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import ArticleList from "@/components/content/ArticleList";
import SideBar from "@/components/content/Sidebar";

export default {
  name: "Home",
  components: {
    ArticleList,
    SideBar,
    Header,
    Footer,
  },

  Footerdirectives: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>