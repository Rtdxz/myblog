<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24" :key="item.title" v-for="(index, item) in items">
        <div class="article">
          <div class="article-header">{{ item.title }}</div>
          {{ item }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "articleList",
  components: {},
  directives: {},
  data() {
    return {
      items: [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.article {
  margin-bottom: 20px;
  height: 200px;
  background-color: rgba(180, 180, 180, 0.5);
}
</style>