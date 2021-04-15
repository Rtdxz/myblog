<template>
  <div>
    <aplayer autoplay :music="current" :list="audio"></aplayer>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";

export default {
  name: "MusicPlayer",
  components: { aplayer },
  directives: {},
  data() {
    return {
      current: {
        src:
          "https://m7.music.126.net/20210416004412/a6e8570f5fa62f73a0ad232b0e8d86e9/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3418907157/fc20/2177/208d/47a61bb2b1c97216a63688f5bdee89df.mp3",
      },

      audio: [],
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/api/api/playlist/detail?id=690960343", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
        },
      })
      .then((res) => {
        res.data.result.tracks.forEach((ele) => {
          this.$axios
            .get("https://api.imjad.cn/cloudmusic/?id=" + ele.id)
            .then((res) => {
              console.log(res.data.data[0].url);
              _this.audio.push({
                name: res.data.data[0].id,
                src: res.data.data[0].url,
              });
            });
        });
      });
    console.log(this.audio);
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