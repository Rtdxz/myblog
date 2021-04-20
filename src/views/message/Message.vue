<template>
  <div>
    <div class="container">
      <h1>留言区</h1>
      <div class="box">
        <div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="昵称" prop="name"
              ><el-input v-model="form.name"></el-input
            ></el-form-item>
            <el-form-item label="邮箱" prop="email"
              ><el-input v-model="form.email"></el-input
            ></el-form-item>
            <el-form-item label="留言" prop="message">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="随便写点什么吧"
                v-model="form.message"
              >
              </el-input
            ></el-form-item>

            <el-button type="primary" @click="submit()" :disabled="flag"
              >发表</el-button
            ></el-form
          >
        </div>
        <h1 class="top-message">留言({{ discussions.length }})条</h1>
        <el-row>
          <el-col
            :span="24"
            :key="index"
            v-for="(discussion, index) in discussions"
          >
            <message-item :discussion="discussion"></message-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

import MessageItem from "@/components/content/MessageItem";

import { getAllMessage, addMessage } from "@/network/network";
export default {
  name: "Message",
  components: {
    Header,
    Footer,
    MessageItem,
  },
  directives: {},
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      flag: false,
      form: {
        name: "",
        email: "",
        message: "",
      },
      discussions: [],
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到10 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
          { max: 32, message: "邮箱长度需要小于32 个字符", trigger: "blur" },
        ],
        message: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 3,
            max: 60,
            message: "长度在10到60个字之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getDiscussions();
  },
  mounted() {},
  methods: {
    getDiscussions() {
      let _this = this;
      getAllMessage().then((res) => {
        _this.discussions = res.data.data;
      });
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("submit!");
          let _this = this;
          let date = this.timeFormatter();
          _this.form.date = date; //设置发布时间
          console.log(_this.form.date);
          this.form.message = this.form.message.replace(/\</g, " ");
          this.form.message = this.form.message.replace(/\>/g, " ");
          addMessage(this.form).then((res) => {
            console.log(res);
            _this.flag = true;
            setTimeout(() => {
              _this.flag = false;
            }, 4000);
            _this.getDiscussions();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    timeFormatter() {
      var datetime = new Date();
      let year = datetime.getFullYear();
      let month = datetime.getMonth() + 1;
      let date = datetime.getDate();
      let hour = datetime.getHours();
      let minutes = datetime.getMinutes();
      let second = datetime.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second
      );
    },
  },
};
</script>

<style  scoped>
.el-button {
  margin-top: 20px;
}
.el-input {
  width: 300px;
}
.top-message {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 0;
}
.box {
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
</style>