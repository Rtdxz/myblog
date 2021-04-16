<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>留言区</h1>
      <div class="box">
        <div>
          <el-form ref="form" :model="form">
            <el-form-item label="昵称"
              ><el-input v-model="form.name"></el-input
            ></el-form-item>
            <el-input
              type="textarea"
              :rows="10"
              placeholder="随便写点什么吧"
              v-model="form.message"
            >
            </el-input>
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
    <Footer></Footer>
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
    return {
      flag: false,
      form: {
        name: "",
        message: "",
      },
      discussions: [],
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
      let _this = this;
      let date = this.timeFormatter();
      _this.form.date = date; //设置发布时间
      console.log(_this.form.date);
      addMessage(this.form).then((res) => {
        console.log(res);
        _this.flag = true;
        setTimeout(() => {
          _this.flag = false;
        }, 40000);
        _this.getDiscussions();
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

  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
</style>