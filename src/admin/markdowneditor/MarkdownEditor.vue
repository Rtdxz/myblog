<template>
  <div class="wrap">
    <h1>编写博客</h1>
    <el-input v-model="title"></el-input>
    <!-- <mavon-editor v-model="content" /> -->
    <mavon-editor
      ref="md"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      v-model="content"
    ></mavon-editor>

    <el-row :gutter="40">
      <el-col :span="3" :offset="6">
        <el-button type="primary" size="medium" @click="uploadimg"
          >保存</el-button
        >
      </el-col>
      <el-col :span="3" :offset="6">
        <el-button type="primary" size="medium" @click="summit">发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "MarkDownEditor",
  components: {},
  directives: {},
  data() {
    return {
      title: "",
      content: "",
      defaultData: "preview",
      img_file: {},
    };
  },
  mounted() {},
  methods: {
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadimg($e) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
        console.log(formdata.keys());
      }
      request({
        url: "/api/article/add/images",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        console.log(res);
        /**
         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
         * pos 为原图片标志（0）
         * url 为上传后图片的url地址
         */
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // for (var img in res) {
        //   // $vm.$img2Url 详情见本页末尾
        //   this.$refs.md.$img2Url(img[0], img[1]);
        // }
      });
    },

    summit() {
      let _this = this;

      request({
        method: "post",
        url: "/api/article/add",
        data: {
          title: _this.title,
          content: _this.content,
        },
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style  scoped>
h1 {
  padding-left: 40px;
}
.v-note-wrapper {
  width: 100%;
  min-height: 600px;
  margin: 10px auto;
  margin-bottom: 50px;
}
</style>