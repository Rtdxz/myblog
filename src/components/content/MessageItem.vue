<template>
  <div>
    <div class="box">
      <div class="head">{{ discussion.name }} 说:</div>
      <div class="content">
        <p>{{ discussion.message }}</p>
      </div>
      <div class="foot">
        {{ discussion.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messageitem",
  components: {},
  directives: {},
  props: {
    discussion: { type: Object, default: {} },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.box {
  min-height: 70px;
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}
.head {
}
.content {
  margin: 20px 20px 10px;

  padding: 0 1vw 0;
  min-height: 40px;
}
.content p {
  word-wrap: break-word;

  word-break: break-all;
}
.foot {
  text-align: right;
  color: #6e7173;
  font-size: 14px;
}
</style>