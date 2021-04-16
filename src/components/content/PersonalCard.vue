<template>
  <div class="box">
    <div class="top">
      <div class="profile-picture">
        <img src="~@/assets/img/profile-picture2.jpg" alt="图片显示错误" />
      </div>
      <div class="name">Crt</div>
      <div class="info">
        <div class="info-articleCount">
          <span>{{ articleCount }}</span> <span>文章数</span>
        </div>
        <div class="info-visitorVolume">
          <span>{{ visitorVolume }}</span
          ><span>访问量</span>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="content-head">分类</div>
      <div class="center-content">
        <div
          class="category"
          v-for="category in categoryList"
          :key="category.classify"
        >
          <router-link :to="'/categories/' + category.classify"
            >{{ category.classify }}
            <span>{{ category.sum }}</span></router-link
          >
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="content-head">标签</div>
      <div>
        <Tag :UnderTheFlagType="alltags" @clickTag="moveToOtherPage"></Tag>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/common/Tag";

import { getCategoryList, getAllTags } from "@/network/network";
export default {
  name: "Personalcard",
  components: {
    Tag,
  },
  directives: {},
  props: {
    visitorVolume: {
      type: Number,
      default: 999,
    },
    articleCount: {
      type: Number,
      default: 999,
    },
  },
  data() {
    return {
      alltags: [1332, 2, 3, 4],
      categoryList: [],
    };
  },
  created() {
    this.getCategoryList();
    this.getAllTags();
  },
  mounted() {},
  methods: {
    moveToOtherPage(target) {
      this.$router.push("/tag/" + target);
    },
    getCategoryList() {
      getCategoryList().then((res) => {
        this.categoryList = res.data.data;
        console.log(this.categoryList);
      });
    },
    getAllTags() {
      getAllTags().then((res) => {
        console.log(res);
        this.alltags = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
}
.top {
  text-align: center;
  margin: 10px 40px 0;
  border-bottom: 2px solid rgb(220, 223, 230);
  padding: 30px;
}
.profile-picture {
  max-width: 170px;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  width: 50%;
  height: 50%;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.profile-picture img {
  width: 100%;
}
.info {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.name {
  font-size: 30px;
}
.info div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info div span {
  margin-top: 5px;
}
.info-articleCount span:first-child,
.info-visitorVolume span:first-child {
  font-size: 30px;
  font-weight: 700;
}
.center {
  margin: 30px 40px 0;
  border-bottom: 2px solid rgb(220, 223, 230);
}
.bottom {
  margin: 30px 40px 0;
}
.content-head {
  margin-bottom: 20px;
}
.center-content {
  margin-bottom: 20px;
  .category {
    a {
      display: inline-block;
      width: 100%;
      height: 40px;
      padding-left: 20px;
      box-sizing: border-box;
      // border: 1px solid #ddd;
      color: black;
      text-decoration: none;
      text-align: left;
      line-height: 40px;
      position: relative;
      span {
        position: absolute;
        right: 10px;
      }
    }
    a:hover {
      background-color: #eee;
    }
  }
}
</style>