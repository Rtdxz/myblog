<template>
  <div class="musicplayer" :class="{ 'hidden-musicplayer': !isPlayerShow }">
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="300"
      height="110"
      src="//music.163.com/outchain/player?type=0&id=690960343&auto=0&height=90"
    ></iframe>

    <span
      :class="{
        'el-icon-arrow-right': !isPlayerShow,
        'el-icon-arrow-left': isPlayerShow,
        'hidden-span': !isPlayerShow,
      }"
      @click="isPlayerShow = !isPlayerShow"
    ></span>
  </div>
</template>

<script>
export default {
  name: "CloudMusicPlayer",
  components: {},
  directives: {},
  data() {
    return {
      isPlayerShow: true,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.musicplayer {
  position: fixed;
  left: 10px;
  bottom: 30px;
  width: 312px;
  height: 110px;
  transition: all 0.8s ease;
  overflow: hidden;
  z-index: 10000;
}
.musicplayer span {
  position: absolute;
  display: block;
  right: 0px;
  top: 10px;
  width: 20px;
  height: 90px;
  background-color: #fff;
  line-height: 90px;
  text-align: center;
  cursor: pointer;
}
.hidden-span {
  height: 110px !important;
  top: 0px !important;
}
.hidden-musicplayer {
  width: 20px;
}
.player {
  box-shadow: none;
}
</style>