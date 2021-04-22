<template>
  <div>
    <div class="container">
      <h1>你的页面不在这哦！还有{{ time }}秒后跳回主页</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  components: {},
  directives: {},
  data() {
    return {
      time: 3,
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.time--;

      if (this.time == 0) {
        clearInterval(timer);
        this.$router.push("/home");
      }
    }, 1000);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>