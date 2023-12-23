<template>
  <div class="login-container">
    <canvas id="canvas" style="display: block"></canvas>
    <div class="loginBox">
      <div class="title">
        <h1>前端小杜&nbsp;·&nbsp;通用后台系统</h1>
        <p>Strive Everyday</p>
      </div>
      <div class="form">
        <a-space direction="vertical" size="middle" style="display: flex">
          <a-input v-model:value="username" placeholder="请输入用户名" />
          <a-input-password v-model:value="password" placeholder="请输入密码" />
          <div class="captchaBox">
            <a-input placeholder="请输入验证码" />
            <div class="captchaImg" @click="getCaptchaImg">
              <img height="38" :src="captchaImg" alt="" />
            </div>
          </div>
          <a-button type="primary" class="loginBtn" block @click="gotoLogin">
            登录
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import initLoginBg from "./init.ts";
import { CaptchaAPI, LoginAPI, GetUuidAPI } from "@/api/loginApi.js";
const userInformation = reactive({
  username: "",
  password: "",
  userCode: "",
  remember: true,
});
const visible = ref(true);
const captchaImg = ref("");

// 登录方法
const gotoLogin = () => {
  const params = {
    // username: usernameVal,
    // password: passwordVal,
    // userCode: captchaVal,
    uuid: localStorage.getItem("uuid"),
  };
  LoginAPI(params).then((res) => {});
};
// 点击验证码图片盒子的事件函数
const getCaptchaImg = async () => {
  // uuid请求
  GetUuidAPI().then((res) => {});
  let getUuidAPIRes = await GetUuidAPI();
  // 做验证码的请求
  const params = { imageCodeKey: getUuidAPIRes.data };
  // 1、把图片数据显示在img上面
  CaptchaAPI(params).then((res) => {});
  let captchaAPIRes = await CaptchaAPI(params);
  let url = window.URL.createObjectURL(
    new Blob([captchaAPIRes], { type: "image/png" })
  );
  setCaptchaImg(url);
  // 2、本地保存uuid，给登录的时候用
  localStorage.setItem("uuid", getUuidAPIRes.data);
};

onMounted(() => {
  initLoginBg();
  window.onresize = function () {
    initLoginBg();
  };
});
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  .loginBox {
    width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;

    h1 {
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      color: #fff;
    }
    p {
      text-align: center;
      margin: 20px 0;
    }
    .title {
      margin-bottom: 40px;
      position: relative;
      &:before,
      &:after {
        content: "";
        width: 100px;
        height: 2px;
        position: absolute;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #1976d2);
        left: -20px;
        top: 18px;
      }
      &:after {
        left: auto;
        background: linear-gradient(to left, rgba(255, 255, 255, 0), #1976d2);
        right: -20px;
      }
    }
  }
}
</style>
