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
          <a-input
            v-model:value="userInformation.username"
            placeholder="请输入用户名"
          />
          <a-input-password
            v-model:value="userInformation.password"
            placeholder="请输入密码"
          />
          <div class="captchaBox">
            <a-input
              v-model:value="userInformation.userCode"
              placeholder="请输入验证码"
            />
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
import { message } from "ant-design-vue";
import {
  ref,
  reactive,
  onMounted,
  watch,
  onBeforeMount,
  onUpdated,
  onBeforeUpdate,
} from "vue";
import initLoginBg from "./init.ts";
import { CaptchaAPI, LoginAPI, GetUuidAPI } from "@/api/loginApi.js";
import { useRouter } from "vue-router";

const userInformation = reactive({
  username: "",
  password: "",
  userCode: "",
  uuid: "",
});
const visible = ref(true);
const captchaImg = ref("");
const UuidAPIRes = ref("");
// 路由跳转
const router = useRouter();

// 登录方法
const gotoLogin = () => {
  const params = userInformation;
  LoginAPI(params).then((res) => {
    if (res.code === 1) {
      // 1、提示登录成功
      message.info("登录成功！");
      // 2、保存token
      localStorage.setItem("token", res.data.token);
      // 3、跳转到/page1
      router.push("/page1");
      // 4、删除本地保存中的uuid
      localStorage.removeItem("uuidVue");
    }
  });
};
// 点击验证码图片盒子的事件函数
const getCaptchaImg = async () => {
  // uuid请求
  GetUuidAPI().then((res) => {});
  let getUuidAPIRes = await GetUuidAPI();
  UuidAPIRes.value = getUuidAPIRes.data;
  // 做验证码的请求
  const params = { imageCodeKey: getUuidAPIRes.data };
  // 1、把图片数据显示在img上面
  CaptchaAPI(params).then((res) => {});
  let captchaAPIRes = await CaptchaAPI(params);
  let url = window.URL.createObjectURL(
    new Blob([captchaAPIRes], { type: "image/png" })
  );
  captchaImg.value = url;
  // 2、本地保存uuid，给登录的时候用
  localStorage.setItem("uuidVue", getUuidAPIRes.data);
};

watch(UuidAPIRes, (newValue, oldValue) => {
  if (newValue) {
    console.log(
      `我侦听到了UuidAPIRes状态的变化，当前值为${newValue},从而处理相关逻辑`
    );
    userInformation.uuid = newValue;
  }
});
onMounted(() => {
  getCaptchaImg();
  initLoginBg();
  window.onresize = function () {
    initLoginBg();
  };
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
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
