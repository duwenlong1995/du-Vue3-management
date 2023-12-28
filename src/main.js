import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import axios from "./api/request";
// 全局样式
import "@/assets/styles/global.scss";
import { createPinia } from "pinia";
const pinia = createPinia();

const vueApp = createApp(App);
vueApp.use(pinia);
vueApp.use(router);
vueApp.provide("$axios", axios);
vueApp.mount("#app");
