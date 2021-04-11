<template>
  <div class="wrap">
    <h1>编写博客</h1>
    <el-form ref="form" :model="article" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title"
        ><el-input v-model="article.title"></el-input
      ></el-form-item>
      <el-form-item label="简述">
        <el-input v-model="article.describe"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-select v-model="article.classify" placeholder="编程">
          <el-option label="编程" value="编程"></el-option>
          <el-option label="日常" value="日常"></el-option>
        </el-select>
      </el-form-item>
      <!-- <mavon-editor v-model="content" /> -->
      <mavon-editor
        ref="md"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        v-model="article.content"
      ></mavon-editor>

      <el-row :gutter="40">
        <el-col :span="3" :offset="6">
          <el-button type="primary" size="medium">保存</el-button>
        </el-col>
        <el-col :span="3" :offset="6">
          <el-button type="primary" size="medium" @click="submitForm('form')"
            >发布</el-button
          >
        </el-col>
      </el-row>
    </el-form>
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
      article: {
        title: "",
        content: "",
        describe: "",
        classify: "",
        tag: "",
        date: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { max: 10, message: "不得大于10字符", trigger: "blur" },
        ],
        classify: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
      },

      img_file: {},
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // $imgAdd(pos, $file) {
    //   // 缓存图片信息
    //   this.img_file[pos] = $file;
    // },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    // uploadimg($e) {
    //   // 第一步.将图片上传到服务器.
    //   var formdata = new FormData();
    //   for (var _img in this.img_file) {
    //     formdata.append(_img, this.img_file[_img]);
    //     console.log(this.img_file[_img]);
    //   }
    //   request({
    //     url: "/api/article/add/images",
    //     method: "post",
    //     data: formdata,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }).then((res) => {
    //     console.log(res);
    //     /**
    //      * 例如：返回数据为 res = [[pos, url], [pos, url]...]
    //      * pos 为原图片标志（0）
    //      * url 为上传后图片的url地址
    //      */
    //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     // for (var img in res) {
    //     //   // $vm.$img2Url 详情见本页末尾
    //     //   this.$refs.md.$img2Url(img[0], img[1]);
    //     // }
    //   });
    // },

    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      request({
        url: "/api/article/add/images",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        let url = res.data;
        console.log(url);
        this.$refs.md.$img2Url(pos, url);
      });
    },

    //提交
    submit() {
      let _this = this;
      _this.article.date = new Date().toJSON().slice(0, 10); //设置发布时间
      console.log(_this.article.date);
      request({
        method: "post",
        url: "/api/article/add",
        data: _this.article,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="sass" scoped>
$blue-color: #409eff

.span
  height: 40px
  line-height: 40px
  text-align: center

h1
  padding-left: 40px
  margin-bottom: 40px

.v-note-wrapper

  width: 97%
  min-height: 500px

  margin-top: 50px
  margin-left: 40px

  margin-bottom: 50px
</style>