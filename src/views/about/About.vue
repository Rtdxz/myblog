<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="title">
        <h1>关于页面</h1>
        <p class="post-meta">time,visit</p>
      </div>

      <div class="info">
        <p>目前瞎折腾中<br />不知道会发生什么</p>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import SideBar from "@/components/content/Sidebar";
export default {
  name: "About",
  components: {
    SideBar,
    Header,
    Footer,
  },
  directives: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.title {
  text-align: center;
  padding: 20px;
}
.info {
  margin: 0 auto;
  padding: 10px;
  width: 600px;
  height: 400px;
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.1); */
}
.info p {
  line-height: 1.5;
  font-size: 18px;
}
</style>