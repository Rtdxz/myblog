<template>
  <div class="button">
    <i class="el-icon-arrow-down"></i>
  </div>
</template>

<script>
export default {
  name: "Tobottombutton",
  components: {},
  directives: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.button {
  background-color: rgba(100, 100, 100, 0.1);
  position: absolute;
  bottom: 0;
  height: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 50px;
  width: 100%;
  visibility: hidden;
}
.button:hover {
  visibility: initial;
}
</style>