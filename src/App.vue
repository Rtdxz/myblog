<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/markdown.css";
* {
  transition: ease-out 0.1s;
}
.container {
  max-width: 80%;
  margin: 0 auto;
}
@media screen and (max-width: 800px) {
  .container {
    max-width: 95% !important;
    margin: 0 auto;
  }
}
</style>
