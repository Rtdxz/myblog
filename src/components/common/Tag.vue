<template>
  <div class="TagTypeMoudle">
    <span
      class="flagButton"
      v-for="(item, index) in UnderTheFlagType"
      v-bind:key="index"
      @click="flagButton(index, item)"
      :class="{ flagButtonClick: isClickFlag == index }"
      >{{ item }}</span
    >
  </div>
</template>
<script>
export default {
  //父组件传过来的有几个tag以及tag上的文字。
  props: ["UnderTheFlagType"],
  data() {
    return {
      isClickFlag: null,
    };
  },
  methods: {
    flagButton(index, item) {
      this.isClickFlag = index;
      //  发射到父组件的方法，在父组件内可以触发该方法
      this.$emit("clickTag", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.TagTypeMoudle {
  width: 100%;
  padding-bottom: 20px;

  .flagButton {
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
  .flagButton:hover {
    background: lightblue;
    color: #ffffff;
    cursor: pointer;
  }
  .flagButtonClick {
    background: lightblue;
    color: #ffffff;
  }
}
</style>
