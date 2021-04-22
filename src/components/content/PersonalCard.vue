<template>
  <div class="box">
    <div class="top">
      <div class="profile-picture">
        <img src="~@/assets/img/profile-picture2.jpg" alt="图片显示错误" />
      </div>
      <div class="name">Crt</div>
      <div class="motto">努力学习中</div>
      <!-- <div class="info">
        <div class="info-articleCount">
          <span>{{ articleCount }}</span>
          <span>文章数</span>
        </div>
        <div class="info-visitorVolume">
          <span>{{ visitorVolume }}</span
          ><span>访问量</span>
        </div>
      </div> -->
      <div class="info">
        <a
          class="icon iconfont qq"
          :href="require('@/assets/img/qq.png')"
          target="_Blank"
          >&#xe646; </a
        ><a
          class="icon iconfont wechat"
          :href="require('@/assets/img/wechat.jpg')"
          target="_Blank"
          >&#xe647;
        </a>
        <a
          class="icon iconfont email"
          href="mailto:1712045716@qq.com?subject=邮件标题&body=邮件内容"
          title="1712045716@qq.com"
          >&#xe649;
        </a>
        <a
          class="icon iconfont zhihu"
          href="https://500px.com.cn/community/user-details/287dc82ff428fbfd252246600f2538595"
          target="_Blank"
          title="500px中国"
          >&#xe693;
        </a>
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
          <router-link :to="'/home/category/' + category.classify"
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
    <div class="search">
      <div class="content-head">搜索</div>
      <div>
        <el-input v-model="key">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="moveToSearchPage"
          ></el-button
        ></el-input>
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
  props: {},
  data() {
    return {
      alltags: ["html", "js", "css", "es6"],
      categoryList: [],
      key: "",
    };
  },
  created() {
    this.getCategoryList();
    this.getAllTags();
  },
  mounted() {},
  methods: {
    moveToOtherPage(target) {
      this.$router.push("/home/tag/" + target);
    },
    moveToSearchPage() {
      if (this.key == "") {
        return;
      }
      this.$router.push("/home/key/" + this.key);
    },
    getCategoryList() {
      getCategoryList().then((res) => {
        this.categoryList = res.data.data;
        // console.log(this.categoryList);
      });
    },
    getAllTags() {
      getAllTags().then((res) => {
        // console.log(res);
        this.alltags = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.top {
  text-align: center;
  margin: 0 40px 0;
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
  margin-bottom: 10px;
}
.info {
  a {
    flex: 1;
    cursor: pointer;
    font-size: 3vw;
    text-decoration: none;
  }
  .qq {
    color: rgb(104, 165, 225);
  }
  .wechat {
    color: rgb(141, 200, 27);
  }
  .email {
    color: rgb(112, 138, 151);
  }
  .zhihu {
    color: rgb(221, 4, 30);

    font-size: 2.5vw;
    margin-top: 0.3vw;
  }
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
.center,
.bottom,
.search {
  margin: 30px 40px 0;
}
.center,
.bottom {
  border-bottom: 2px solid rgb(220, 223, 230);
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
.search {
  margin-bottom: 30px;
}
</style>