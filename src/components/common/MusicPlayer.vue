<template>
  <div class="player">
    <audio :src="musicUrl" autoplay="" controls=""></audio>
  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  components: {},
  directives: {},
  data() {
    return {
      musicUrl: "",
    };
  },
  created() {
    this.$axios
      .get("https://api.imjad.cn/cloudmusic/?type=song&id=4992343")
      .then((res) => {
        // console.log(res.data.data[0]);
        this.musicUrl = res.data.data[0].url;
      });
    this.$axios
      .get("https://api.imjad.cn/cloudmusic/?type=playlist&id=690960343")
      .then((res) => {
        console.log(res.data.playlist.tracks);
      });
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.player {
}
audio {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
}
</style>