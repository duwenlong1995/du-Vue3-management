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

// const pendingRequest = [];
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    /**
     *
     */
    // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
    // const markIndex = pendingRequest.findIndex((item) => {
    //   return item.name === requestMark;
    // });
    // // 存在，即重复了
    // if (markIndex > -1) {
    //   // 取消上个重复的请求
    //   pendingRequest[markIndex].cancel();
    //   // 删掉在pendingRequest中的请求标识
    //   pendingRequest.splice(markIndex, 1);
    // }
    // // 记录本次请求的标识
    // pendingRequest.push({
    //   name: requestMark,
    //   cancel: source.cancel,
    //   routeChangeCancel: config.routeChangeCancel, // 可能会有优先级高于默认设置的routeChangeCancel项值
    // });
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

// const handleResponseIntercept = (config) => {
//   closeLoading();
//   // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
//   const markIndex = pendingRequest.findIndex((item) => {
//     return item.name === config.requestMark;
//   });
//   // 找到了就删除该标识
//   markIndex > -1 && pendingRequest.splice(markIndex, 1);
// };
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // handleResponseIntercept(res.config);
    // 在请求结束时隐藏进度条
    NProgress.done(); // 设置加载进度条(结束..)
    return res.data;
  },
  (err) => {
    // // 在请求错误时隐藏进度条，并弹出错误提示
    // message.error("请求发生错误，请重试！");
    if (response) {
      // handleResponseIntercept(response.config);
    }
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
// export { pendingRequest };
