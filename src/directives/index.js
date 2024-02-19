import sizeOb from "./sizeDirect";
// 自定义指令
const directives = {
  sizeOb,
};

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
