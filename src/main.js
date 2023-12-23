import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import axios from "./api/request";

const vueApp = createApp(App);

vueApp.use(router);
vueApp.provide("$axios", axios);
vueApp.mount("#app");
