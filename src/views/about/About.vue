<template>
  <div>
    <div class="container">
      <div class="title">
        <h1>关于</h1>
      </div>
      <div class="box">
        <div class="info">
          <h3>关于我</h3>
          <p>
            一枚在校的大三工科学生，爱好是摄影下棋，不时地往500px,像素蜜蜂投图(有去拍照才更新)，以后想做前端
          </p>

          <h3>关于本网站</h3>
          <p>
            前端vue,vue-cli,vue-router，样式用的是element-ui和自己写的一些，后端使用的主要是node,express,mysql，服务器用的阿里云
          </p>
          <p>
            从界面，前端到后台均由自己制作，通过在github上浏览了多个开源项目进行学习架构,借鉴各路大神的博客进行设计与编写
          </p>

          <h3>其他</h3>
          <p>qq:1712045716</p>
          <p>
            <a :href="require('@/assets/img/wechat.jpg')" target="_Blank">
              微信</a
            >
          </p>
          <p>
            <a
              href="https://app.pxbee.com.cn/photographer/p11761061"
              target="_Blank"
            >
              像素蜜蜂</a
            >
          </p>
          <a
            href="https://500px.com.cn/community/user-details/287dc82ff428fbfd252246600f2538595"
            target="_Blank"
            >500px
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import SideBar from "@/components/content/Sidebar";
export default {
  name: "About",
  components: {
    SideBar,
    Header,
    Footer,
  },
  directives: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.info {
  padding: 10px;

  min-height: 400px;
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.1); */
}
h3 {
  margin: 40px 0 20px;
  color: black;
}
h3:first-child {
  margin: 0 0 20px;
}
.info p {
  line-height: 1.5;
  font-size: 18px;
  margin: 10px 0 10px;
}
.info a {
  text-decoration: none;
  color: #01aaed;
}
.box {
  color: #606266;
  padding: 40px;
  min-height: 70vh;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
</style>