<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="title">
        <h1>关于页面</h1>
        <p class="post-meta">time,visit</p>
      </div>

      <div class="info">
        <p>
          ●广工大三计算机学生一枚<br />
          目前瞎折腾中<br />
          不知道会发生什么<br />
          目前很多功能尚未完善<br />
        </p>
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
}
.info {
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