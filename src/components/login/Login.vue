<template>
  <div id="app">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="8">
        <!-- 表单 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startLogin()">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
// 引入axios
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录按钮
    startLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          console.log("校验失败");
        }

        // 校验成功
        console.log("成功");

        // 发送请求了
        axios
          .post("http://localhost:8888/api/private/v1/login", this.loginForm)
          .then(res => {
            console.log(res);
            if (res.data.meta.status === 200) {
              // 登录成功
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });
              // 保存
              localStorage.setItem("token", res.data.data.token);
              // 跳转
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
      });
    },
    // 重置按钮
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style>
.el-row {
  height: 100%;
  background: #2d434c;
}

.el-col {
  background: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
