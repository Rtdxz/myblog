<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>留言区</h1>
      <div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="随便写点什么吧"
          v-model="textarea"
        >
        </el-input>
        <el-button type="primary">发表</el-button>
      </div>
      <div style="height: 200px"></div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
export default {
  name: "Message",
  components: {
    Header,
    Footer,
  },
  directives: {},
  data() {
    return {
      textarea: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>