import axios from "axios";
import { message } from "ant-design-vue";
import NProgress from "nprogress"; // 引入nprogress插件
import "nprogress/nprogress.css"; // 这个nprogress样式必须引入

// 创建axios实例
const instance = axios.create({
  // 基本请求路径的抽取
  // baseURL:"http://xue.cnkdl.cn:23683",
  baseURL: "",
  // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
  timeout: 20000,
  // 在请求头中设置 responseType 属性
  // responseType: "arraybuffer",
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求开始前显示进度条
    NProgress.start(); // 设置加载进度条(开始..)
    //让每个请求携带token
    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 在请求结束时隐藏进度条
    NProgress.done(); // 设置加载进度条(结束..)
    return res.data;
  },
  (err) => {
    // // 在请求错误时隐藏进度条，并弹出错误提示
    // message.error("请求发生错误，请重试！");
    if (message == "Network Error") {
      message.error("后端接口连接异常！");
    } else if (message.includes("timeout")) {
      message.error("系统接口请求超时！");
    } else if (message.includes("Request failed with status code")) {
      message.error("系统接口" + message.substr(message.length - 3) + "异常！");
    }
    return Promise.reject(err);
  }
);

export default instance;
