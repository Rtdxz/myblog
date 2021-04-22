<template>
  <div class="nav hide hidden-sm-and-down">
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
  /*  directives: { Clickoutside }, */
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      flag: true,
    };
  },

  mounted() {},
  methods: {
    /* clickoutside() {
      document.getElementsByClassName(
        "el-tree-node__children"
      )[0].style.display = "none";
      document.getElementsByClassName("el-tree-node__content")[0].click();
    }, */
    goAnchorPoint(elemId) {
      let anchorH = document.getElementById(elemId).offsetTop - 70;

      if (document.documentElement.scrollTop) {
        // document.documentElement.scrollTop = anchorH;
        this.anmita("document", anchorH);
      } else if (document.body.scrollTop) {
        // document.body.scrollTop = anchorH;
        this.anmita("body", anchorH);
      } else {
        //二者均为0状态，有一者恒为0，另一者可能因为回到顶部等操作被置为0，便会出现这种状况
        this.anmita("body", anchorH);
        this.anmita("document", anchorH);
      }

      //window.scrollTo(0,anchorH)  //若以上scrollTop方式不生效，可使用此scrollTo方式，但注意scrollTo在安卓手机上存在兼容性问题
    },
    anmita(classify, anchorH) {
      console.log(anchorH, document.documentElement.scrollTop);
      let _this = this;
      if (!_this.flag) return;
      _this.flag = false;
      if (classify == "document") {
        let y = Math.floor(document.documentElement.scrollTop - anchorH);
        if (y > 0) {
          let timer = setInterval(function () {
            document.documentElement.scrollTop -= Math.floor(
              (document.documentElement.scrollTop - anchorH) / 10
            );
            console.log(document.documentElement.scrollTop - anchorH);
            if (document.documentElement.scrollTop - anchorH < 10) {
              clearInterval(timer);
              _this.flag = true;
            }
          }, 10);
        } else {
          let timer = setInterval(function () {
            document.documentElement.scrollTop += Math.floor(
              (anchorH - document.documentElement.scrollTop) / 10
            );
            console.log(anchorH - document.documentElement.scrollTop);
            console.log(anchorH, document.documentElement.scrollTop);

            console.log(document.documentElement.clientHeight);
            if (
              anchorH - document.documentElement.scrollTop < 10 ||
              anchorH - document.documentElement.scrollTop <
                document.documentElement.clientHeight / 2
            ) {
              clearInterval(timer);
              _this.flag = true;
            }
          }, 10);
        }
      } else {
        let y = Math.floor(document.body.scrollTop - anchorH);
        if (y > 0) {
          let timer = setInterval(function () {
            document.body.scrollTop -= Math.floor(
              (document.body.scrollTop - anchorH) / 10
            );
            console.log(document.body.scrollTop - anchorH);
            if (document.body.scrollTop - anchorH < 10) {
              clearInterval(timer);
              _this.flag = true;
            }
          }, 10);
        } else {
          let timer = setInterval(function () {
            document.body.scrollTop += Math.floor(
              (anchorH - document.body.scrollTop) / 10
            );
            console.log(anchorH - document.body.scrollTop);
            console.log(anchorH, document.body.scrollTop);

            console.log(document.body.clientHeight);
            if (
              anchorH - document.body.scrollTop < 10 ||
              anchorH - document.body.scrollTop < document.body.clientHeight / 2
            ) {
              clearInterval(timer);
              _this.flag = true;
            }
          }, 10);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  bottom: 200px;
  right: 20px;
  transition: 0.3s linear;
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