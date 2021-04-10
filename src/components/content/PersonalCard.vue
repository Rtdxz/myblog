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
    <div class="bottom">
      <div>最近文章</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personalcard",
  components: {},
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
    return {};
  },
  mounted() {},
  methods: {},
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
  width: 70%px;
  height: 70%px;
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
.bottom {
  margin: 30px 40px 0;
}
</style>