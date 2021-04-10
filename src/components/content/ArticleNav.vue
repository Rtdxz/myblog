<template>
  <div class="nav">
    <!-- <div
      v-for="title in titleArray"
      :key="title.text"
      class="nav-item"
      @click="goAnchorPoint(title.text)"
    >
      {{ title.text }}
    </div> -->
    <el-tree
      :data="titleArray"
      :props="defaultProps"
      accordion
      @node-click="(data) => goAnchorPoint(data.label)"
      v-clickoutside="clickoutside"
    >
    </el-tree>
  </div>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "ArticleNav",
  components: {},
  directives: {},
  props: {
    titleArray: {
      type: Array,
      default: [],
    },
  },
  directives: { Clickoutside },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },

  mounted() {},
  methods: {
    clickoutside() {
      document.getElementsByClassName(
        "el-tree-node__children"
      )[0].style.display = "none";
      document.getElementsByClassName("el-tree-node__content")[0].click();
    },
    goAnchorPoint(elemId) {
      let anchorH = document.getElementById(elemId).offsetTop - 70;

      if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = anchorH;
      } else if (document.body.scrollTop) {
        document.body.scrollTop = anchorH;
      } else {
        //二者均为0状态，有一者恒为0，另一者可能因为回到顶部等操作被置为0，便会出现这种状况
        document.documentElement.scrollTop = anchorH;
        document.body.scrollTop = anchorH;
      }

      //window.scrollTo(0,anchorH)  //若以上scrollTop方式不生效，可使用此scrollTo方式，但注意scrollTo在安卓手机上存在兼容性问题
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  bottom: 200px;
  left: 20px;
}
.nav-item {
  cursor: pointer;
  width: 70px;

  background-color: #fff;
  border: 1px solid rgb(156, 156, 156);
  font-size: 15px;
  text-align: center;
}
.nav-item:hover {
  background-color: #ccc;
}
</style>