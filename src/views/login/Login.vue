<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="login-box"
      :rules="rules"
    >
      <h3 class="login-title">用户登陆</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          size="medium"
          style="width: 200px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          size="medium"
          style="width: 200px"
          prop="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-button"
          >登录</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  name: "Login",
  components: {},
  directives: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("输入符合规范");
        } else {
          console.log("输入不符合规范");
          return false;
        }
      });

      request({
        url: "/api/login",
        method: "post",
        data: _this.form,
      }).then((res) => {
        if (res.data.status == 1) {
          alert(res.data.msg);
        } else if (res.data.status == 0) {
          console.log(res.data.token);
          let token = res.data.token;
          alert(res.data.msg);
          window.localStorage.setItem("token", token);
          this.$router.push("/home");
          location.reload();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 20px rgba(100, 100, 100, 0.3);
}
.login-title {
  text-align: center;
  margin: 10px 0 30px;
}
.login-button {
  margin-left: 40px;
}
</style>